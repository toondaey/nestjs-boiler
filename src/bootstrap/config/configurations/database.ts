import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    default: process.env.DB_CLIENT || 'mysql',

    connections: {
        mysql: {
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            insecureAuth: false,
            synchronize: true,
        }
    }
}));
