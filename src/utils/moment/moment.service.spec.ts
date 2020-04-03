import moment from "moment";
import { MomentService } from './moment.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MomentService', () => {
    let service: MomentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MomentService],
        }).compile();

        service = await module.resolve<MomentService>(MomentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return moment time instance from now property', () => {
        expect(moment.isMoment(service.now)).toBeTruthy();
    });

    it('should get moment', () => {
        expect(typeof service.moment).toBe('function');
    });
});
