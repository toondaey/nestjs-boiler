import * as Chance from  'chance'
import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
    let user;
    let app: INestApplication;
    let configService: ConfigService;
    let chance: Chance = new Chance();
    let userService: UserService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        userService  = moduleFixture.get<UserService>(UserService);
        configService = moduleFixture.get<ConfigService>(ConfigService);
        app.useGlobalPipes(
            new ValidationPipe({
                disableErrorMessages: configService.get('app.env') === 'production',
                whitelist: true,
            })
        );

        await app.init();
        user = {
            email: chance.email(),
            password: chance.word({ min: 8, max: 50 }),
            first_name: chance.first(),
            last_name: chance.last(),
        };
        await userService.save(userService.create(user));
    });

    afterEach(async () => {
        const defaultConnection = getConnection();
        await defaultConnection.createQueryRunner().clearDatabase()
        await defaultConnection.close();
    })

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
                        console.log(res.status);
                    })
            });
        });
    });
});
