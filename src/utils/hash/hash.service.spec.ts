import { HashService } from './hash.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
    let service: HashService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HashService],
        }).compile();

        service = module.get<HashService>(HashService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
