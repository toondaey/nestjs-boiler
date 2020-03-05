import * as Chance from  'chance'
import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { setup } from '../src/bootstrap';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { User as UserEntity} from '../src/user/user.entity'
import { AppModule } from '../src/bootstrap/app/app.module';
import { User } from '../src/user/interfaces/user.interface';
import { INestApplication, HttpStatus } from '@nestjs/common';

describe('AppController (e2e)', () => {
    let user: User;
    let userEntity: UserEntity;
    let app: INestApplication;
    let configService: ConfigService;
    let chance: Chance = new Chance();
    let userService: UserService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = await setup(async () => await moduleFixture.createNestApplication());
        await app.init();

        userService  = moduleFixture.get<UserService>(UserService);
        configService = moduleFixture.get<ConfigService>(ConfigService);

        user = {
            email: chance.email(),
            password: chance.word({ length: Math.ceil(Math.random() * 42) + 8}),
            first_name: chance.first(),
            last_name: chance.last(),
        };

        userEntity = await userService.save(userService.create(user));
    });

    afterEach(async () => {
        const defaultConnection = getConnection();
        await defaultConnection.createQueryRunner().clearDatabase()
        await defaultConnection.close();
    });

    describe('authentication', () => {
        describe('/auth/login (POST)', () => {
            it('should validate login input', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({ email: user.email, password: chance.word({ min: 8, max: 50 }) })
                    .expect(HttpStatus.UNAUTHORIZED)
                    .then(res => {
                        expect(res.body)
                            .toMatchObject({ statusCode: HttpStatus.UNAUTHORIZED, error: 'Unauthorized' });
                    });
            });

            it('should successful login', () => {
                return request(app.getHttpServer())
                    .post('/auth/login')
                    .send({ email: user.email, password: user.password })
                    .expect(HttpStatus.OK)
                    .then(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                type: 'bearer',
                                token: expect.any(String),
                                validFor: configService.get('app.jwt.maxAge'),
                                expiresIn: configService.get('app.jwt.expiresIn'),
                            })
                        );
                    });
            });
        });

        describe('/auth/register (POST)', () => {
            it('should validate registration input', () => {
                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send({ email: chance.word() })
                    .then(res => {
                        expect(res.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
                    })
            });

            it('should create a new user', async () => {
                await userService.remove(userEntity);

                return request(app.getHttpServer())
                    .post('/auth/register')
                    .send(user)
                    .then(async res => {
                        expect(res.status).toBe(HttpStatus.CREATED);
                        expect(res.body).toMatchObject(
                            expect.objectContaining({
                                data: {
                                    id: expect.any(String),
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    email: user.email,
                                }
                            })
                        );

                        const newUser = await userService.findById(res.body.id);
                        expect(newUser).toMatchObject(
                            expect.objectContaining({
                                id: expect.any(String),
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                            })
                        )
                    });
            });
        });
    });
});
