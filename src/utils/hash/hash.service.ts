import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
    hash(data: any, key: string|number): Promise<string> {
        return bcrypt.hash(data, key);
    }

    genSalt(rounds: number): Promise<string> {
        return bcrypt.genSalt(rounds);
    }
}
