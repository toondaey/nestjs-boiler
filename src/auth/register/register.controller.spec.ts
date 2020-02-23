import * as httpMock from 'node-mocks-http';
import { User } from '../../user/user.entity';
import { HttpException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { CreateUserDto } from '../../user/dto/create-user.dto';

describe('Register Controller', () => {
    let controller: RegisterController, module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [RegisterController],
            providers: [UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        users: [],
                        findOne(crit: [keyof User]) {
                            return this.users.find(v => {
                                for (let i in crit) {
                                    if (crit[i] !== v[i]) {
                                        return false;
                                    }
                                }
                                return true;
                            });
                        },
                        create(item) { return item; },
                        async save(item) {
                            this.users.push(item);
                            return item;
                        }
                    }
                }
            ]
        }).compile();

        controller = module.get<RegisterController>(RegisterController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should throw an error when user already exists', async () => {
        const userService = module.get<UserService>(UserService);
        const user = {
            email: 'test@example.org',
            first_name: 'First',
            last_name: 'Last',
            password: 'password'
        };
        await userService.save(plainToClass(User, user));
        const request = httpMock.createRequest({ body: user });

        expect(
            controller.create(plainToClass(CreateUserDto, request.body))
        ).rejects.toThrow(HttpException);
    });

    it('should create a new user', async () => {
        const request = httpMock.createRequest({
            body: {
                email: 'test@example.org',
                first_name: 'First',
                last_name: 'Last',
                password: 'password'
            }
        });

        expect(await controller.create(plainToClass(CreateUserDto, request.body))).toEqual(
            expect.objectContaining({ message: expect.any(String) })
        );
    });
});
