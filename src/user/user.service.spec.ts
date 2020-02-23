import { User } from './user.entity';
import { UserService } from './user.service';
import { UtilsModule } from '../utils/utils.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getRepositoryToken(User),
                    useFactory: jest.fn()
                },
            ],
            imports: [UtilsModule]
        }).compile();

        service = module.get<UserService>(UserService, { strict: false });
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
