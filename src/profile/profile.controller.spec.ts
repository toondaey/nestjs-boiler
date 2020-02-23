import { Request } from 'express';
import * as httpMock from 'node-mocks-http';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';

describe('Profile Controller', () => {
    let controller: ProfileController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProfileController],
        }).compile();

        controller = module.get<ProfileController>(ProfileController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return user\'s profile', () => {
        const request = httpMock.createRequest({
            user: {
                email: 'test@example.org',
                first_name: 'First',
                last_name: 'Last',
                password: 'password'
            }
        }) as Request;
        expect(controller.profile(request)).toEqual(
            expect.objectContaining({
                data: {
                    email: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                }
            })
        );
    });
});
