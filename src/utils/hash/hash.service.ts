import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';

/**
 * HashService
 * @class
 */
@Injectable()
export class HashService {
    /**
     * Hashing data
     * @param {any} data Data
     * @param {string|number} saltOrRounds Encryption times
     * @returns {Promise<string>}
     */
    hash(data: any, saltOrRounds: string | number): Promise<string> {
        return hash(data, saltOrRounds);
    }

    /**
     * Generate salt rounds
     * @param {string|number} rounds Encryption times
     * @returns {Promise<string>}
     */
    genSalt(rounds: number): Promise<string> {
        return genSalt(rounds);
    }

    /**
     * Compare hash with data for validity.
     * @param {any} data Data
     * @param {string} hashed Hashed string
     * @returns {Promise<boolean>}
     */
    compare(data: any, hashed: string): Promise<boolean> {
        return compare(data, hashed);
    }
}
