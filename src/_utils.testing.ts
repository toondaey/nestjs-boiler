import { Repository } from 'typeorm';

export type MockType<T> = {
    [V in keyof T]: jest.Mock<{}>
};

export const mockRespositoryFactory: () => Partial<MockType<Repository<any>>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
}));
