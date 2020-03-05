import * as Chance from 'chance';
import { User } from './user.entity';
import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { UtilsModule } from '../utils/utils.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
    let service: UserService;
    let chance: Chance = new Chance()
    let user: User;

    beforeEach(async () => {
        user = plainToClass(User, {
            first_name: chance.first(),
            last_name: chance.last(),
            email: chance.email(),
            password: chance.word(),
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getRepositoryToken(User),
                    useFactory: jest.fn().mockReturnValue({
                        findOne: jest.fn().mockReturnValue(Promise.resolve(user)),
                        remove: jest.fn().mockReturnValue(Promise.resolve(user)),
                        find: jest.fn().mockReturnValue(Promise.resolve([user])),
                    })
                },
            ],
            imports: [UtilsModule]
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

    it('should test that users can be found via id', async () => {
        expect(await service.findById(user.id)).toMatchObject(
            expect.objectContaining({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            })
        );
    });

    it('should test that all users are returned', async () => {
        expect(await service.find()).toMatchObject(
            expect.arrayContaining([{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            }])
        );
    });

    it('should test that users can be remove by their entity', async () => {
        expect(await service.remove(user)).toMatchObject(
            expect.objectContaining({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            })
        );
    });
});
