import Chance from "chance";
import { HashService } from './hash.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
    let service: HashService;
    let chance: Chance.Chance = new Chance.Chance();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HashService],
        }).compile();

        service = module.get<HashService>(HashService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should generate salt rounds', async () => {
        expect(await service.genSalt(10)).toEqual(expect.any(String));
    });

    it('should hash data with salt rounds number', async () => {
        const data = chance.word();

        expect(await service.hash(data, 10)).toEqual(expect.any(String));
    });

    it('should hash data with salt rounds number', async () => {
        const data = chance.word();

        expect(await service.hash(data, await service.genSalt(10))).toEqual(expect.any(String));
    });

    it('should compare hashed string with data', async () => {
        expect(await service.compare('string1', 'string2')).toEqual(expect.any(Boolean));
    });

    it('should compare hashed string with data and return appropriate value', async () => {
        const data = chance.word();

        const hashed = await service.hash(data, 10);

        expect(await service.compare(data, hashed)).toEqual(true);
    });
});
