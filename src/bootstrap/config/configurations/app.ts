import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    url: process.env.APP_URL,
    jwt: {
        key: process.env.JWT_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN,
        maxAge: process.env.JWT_MAX_AGE,
    }
}));
