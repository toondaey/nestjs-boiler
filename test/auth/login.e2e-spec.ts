import Chance from  'chance';
import "cross-fetch/polyfill";
import request from 'supertest';
import { getConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { configure } from '../../src/configure';
import { AppModule } from '../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { createDbName, deleteDb } from '../utils/db/mgr';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { UserService } from '../../src/user/model/user.service';
import { CreateUserDto } from '../../src/user/model/dto/create-user.dto';

describe('Login (e2e)', () => {
    let user: CreateUserDto;
    let app: INestApplication;
    let configService: ConfigService;
    const chance: Chance.Chance = new Chance.Chance();
    let userService: UserService;
    let password;
    let db: string;

    beforeAll(() => {
        db = process.env.SQLITE_DATABASE = createDbName();
    });

    afterAll(() => {
        deleteDb(db);
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = await moduleFixture.createNestApplication();

        await configure(app);

        await app.init();

        userService  = moduleFixture.get<UserService>(UserService);
        configService = moduleFixture.get<ConfigService>(ConfigService);

        password = chance.word({ length: Math.ceil(Math.random() * 42) + 8 });

        user = {
            username: chance.word(),
            email: chance.email(),
            password,
            firstName: chance.first(),
        };

        await userService.save(userService.create(Object.assign({}, user, { roles: ['user']})));
    });

    afterEach(async () => {
        const defaultConnection = getConnection();
        await defaultConnection.createQueryRunner().clearDatabase();
        await defaultConnection.close();
    });

    describe('authentication', () => {
        describe('/auth/login (POST)', () => {
            it('should validate login input', async () => {
                return request(app.getHttpServer())
                    .post('/graphql')
                    .send({ query: `
                        query {
                            login(credentials: {username: "email", password: "password"}) {
                                status
                                ...on ErrorResponse {
                                    error
                                }
                            }
                        }
                    ` })
                    .expect(HttpStatus.OK)
                    .then(({ body }) => {
                        expect(body)
                            .toMatchObject({ data: { login: { status: HttpStatus.UNAUTHORIZED, error: 'Unauthorized' } } });
                    });
            });

            it('should successful login', async () => {
                return request(app.getHttpServer())
                    .post('/graphql')
                    .send({
                        query: `
                            query {
                                login(credentials: {username: "${user.email}", password: "${password}"}) {
                                    status
                                    ...on Login {
                                        response {
                                            token
                                            _meta {
                                                type
                                                validFor
                                                expiresIn
                                            }
                                        }
                                    }
                                }
                            }
                        `
                    })
                    .expect(HttpStatus.OK)
                    .then(({ body }) => {
                        expect(body)
                            .toMatchObject({
                                data: {
                                    login: {
                                        status: HttpStatus.OK,
                                        response: {
                                            token: expect.any(String),
                                            _meta: {
                                                type: 'bearer',
                                                validFor: configService.get('app.jwt.maxAge'),
                                                expiresIn: configService.get('app.jwt.expiresIn')
                                            }
                                        }
                                    }
                                }
                            });
                    });
            });
        });
    });
});
