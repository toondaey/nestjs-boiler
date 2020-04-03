import redis from "redis";
import RedisStore from "rate-limit-redis";
import { MEMORY, REDIS } from "./store.constants";
import MemoryStore from 'express-rate-limit/lib/memory-store.js';

export function getRateLimiterStore(store: string) {
    switch(store) {
        case MEMORY: return new MemoryStore();
        case REDIS: return new RedisStore({
            client: redis.createClient({
                host: process.env[`APP_RATE_LIMITER_${store.toUpperCase()}_HOST`],
                port: parseInt(process.env[`APP_RATE_LIMITER_${store.toUpperCase()}_PORT`])
            })
        });
        default: throw new Error('Rate limiter store unknown');
    }
}
