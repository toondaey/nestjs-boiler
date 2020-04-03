import Chance from "chance";
import { User } from "./user.entity";
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UtilsModule } from '../../utils/utils.module';

describe('UserService', () => {
    let service: UserService;
    let chance: Chance.Chance = new Chance.Chance();
    let user: User;
    let userRepository: { findOne?: Function } = {};

    beforeEach(async () => {
        user = plainToClass(User, {
            first_name: chance.first(),
            last_name: chance.last(),
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
        expect(await service.findByEmail(user.email)).toMatchObject(
            expect.objectContaining({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            })
        );
    });
});
