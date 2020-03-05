import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    default: process.env.DB_CLIENT || 'mysql',

    connections: {
        mysql: {
            host: process.env.MYSQL_HOST || '127.0.0.1',
            port: parseInt(process.env.MYSQL_PORT) || 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE || 'app',
            insecureAuth: false,
            synchronize: true,
        },
        sqlite: {
            database: process.env.SQLITE_DATABASE,
            synchronize: true,
        }
    }
}));
