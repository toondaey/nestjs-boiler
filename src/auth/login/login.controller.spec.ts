import * as httpMock from 'node-mocks-http';
import { User } from '../../user/user.entity';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoginController } from './login.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';

describe('Login Controller', () => {
    let controller: LoginController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule],
            controllers: [LoginController],
            providers: [
                AuthService, UserService, ConfigService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {}
                }
            ]
        })
            .overrideProvider(JwtService)
            .useValue({ sign() { return ''; } })
            .compile();

        controller = module.get<LoginController>(LoginController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should authenticate user', async () => {
        const request = httpMock.createRequest({ user: { email: 'test@example.org', password: '' }});

        expect(await controller.login(request)).toEqual(expect.objectContaining({ type: expect.any(String) }));
    });

    it('should refresh user\'s token', async () => {
        const request = httpMock.createRequest({ user: { email: 'test@example.org', password: '' } });

        expect(await controller.refreshToken(request)).toEqual(expect.objectContaining({ type: expect.any(String) }));
    });
});
