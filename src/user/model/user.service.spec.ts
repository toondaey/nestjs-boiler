import Chance from "chance";
import { User } from "./user.entity";
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
    let service: UserService;
    const chance: Chance.Chance = new Chance.Chance();
    let user: User;
    const userRepository: { findOne?: Function } = {};

    beforeEach(async () => {
        user = plainToClass(User, {
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email(),
            password: chance.word(),
        });

        userRepository.findOne = jest.fn().mockReturnValue(Promise.resolve(user));

        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepository
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should test that users can be found via email', async () => {
        expect(await service.findByEmailOrUsername(user.email)).toMatchObject(
            expect.objectContaining({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })
        );
    });
});
