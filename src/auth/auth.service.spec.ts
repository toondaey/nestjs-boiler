import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { User } from '../models/user/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from '../utils/hash/hash.service';
import { UserService } from '../models/user/user.service';

describe('AuthService', () => {
    let service: AuthService;
    let userService: Partial<UserService> = {};
    let jwtService: Partial<JwtService> = {};
    let hashService: Partial<HashService> = {};

    beforeEach(async () => {
        userService.findByEmail = jest.fn().mockImplementation(() => Promise.resolve({ password: '' }));

        hashService.compare = jest.fn().mockImplementation(() => Promise.resolve(''));

        jwtService.sign = jest.fn().mockImplementation(() => Promise.resolve(''));

        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, ConfigService,
                {
                    provide: UserService,
                    useValue: userService
                },
                {
                    provide: JwtService,
                    useValue: jwtService
                },
                {
                    provide: HashService,
                    useValue: hashService
                }
            ]
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should validate user', async () => {
        expect(await service.validateUser('test@example.org', '')).not.toBeTruthy();
    });

    it('should login user and return authentication data', async () => {
        expect(await service.login(plainToClass(User, { email: 'test@example.org', password: '' })))
            .toEqual(
                expect.objectContaining({
                    _meta: {
                        type: expect.any(String),
                    },
                    token: expect.any(String),
                })
            );
    });
});
