import Chance from "chance";
import * as httpMock from 'node-mocks-http';
import { AuthService } from '../auth.service';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Auth Controller', () => {
    let chance: Chance.Chance = new Chance.Chance();
    let controller: AuthController;
    let authService: Partial<AuthService> = {};

    beforeEach(async () => {
        authService.login = jest.fn().mockImplementation(() => Promise.resolve({ _meta: { type: '' } }));

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: authService
                }
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should refresh user\'s token', async () => {
        const request = httpMock.createRequest({ user: { email: chance.email(), password: chance.word() } });

        expect(await controller.refreshToken(request)).toEqual(expect.objectContaining({ _meta: { type: expect.any(String) } }));
    });
});
