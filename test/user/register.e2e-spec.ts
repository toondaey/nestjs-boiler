import Chance from 'chance';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { configure } from '../../src/configure';
import { AppModule } from '../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { createDbName, deleteDb } from '../utils/db/mgr';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { UserService } from '../../src/user/model/user.service';
import { User as UserEntity } from '../../src/user/model/user.entity';
import { CreateUserDto } from '../../src/user/model/dto/create-user.dto';

describe('Register (POST)', () => {
    let userEntity: UserEntity;
    let user: CreateUserDto;
    let app: INestApplication;
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

        userService = moduleFixture.get<UserService>(UserService);

        password = chance.word({ length: Math.ceil(Math.random() * 42) + 8 });

        user = {
            username: chance.word(),
            email: chance.email(),
            password,
            firstName: chance.first(),
        };

        userEntity = await userService.save(userService.create(Object.assign({}, user, { roles: ['user'] })));
    });

    afterEach(async () => {
        const defaultConnection = getConnection();
        await defaultConnection.createQueryRunner().clearDatabase();
        await defaultConnection.close();
    });

    it('should validate registration input', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        registerUser(input: { email: "${user.email}" }) {
                            status
                            ...on Status422ErrorResponse {
                                error
                            }
                        }
                    }
                `
            })
            .expect(HttpStatus.BAD_REQUEST)
            .then(({ body }) => {
                expect(body).toEqual({ errors: expect.any(Array) });
            });
    });

    it('should register a new user', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `
                    mutation {
                        registerUser(input: {
                            email: "${user.email}",
                            username: "${user.username}",
                            firstName: "${user.firstName}",
                            password: "${password}",
                        }) {
                            status
                            ...on User {
                                response {
                                    username
                                    firstName
                                    email
                                }
                            }
                        }
                    }
                `
            })
            .expect(HttpStatus.OK)
            .then(async ({ body }) => {
                expect(body).toMatchObject({
                    data: {
                        registerUser: {
                            status: 201,
                            response: {
                                email: user.email,
                                username: user.username,
                                firstName: user.firstName,
                            }
                        }
                    }
                });

                const newUser = await userService.findOne({ select: ['password', 'email', 'firstName', 'username', 'id'] });

                expect(newUser).toMatchObject({
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    password: expect.any(String),
                    id: expect.any(String)
                });
            });
    });
});
