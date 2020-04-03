import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    default: process.env.DATABASE_DEFAULT,

    connections: {
        mongodb: {
            uri: process.env.MONGODB_CONNECTION_URI || 'mongodb://localhost:27017',
            // This can accomodate the user and password but must be
            // used along with the user and pass options below.

            config: {
                autoIndex: false,
                autoCreate: false,
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                user: process.env.MONGODB_APP_USER,
                pass: process.env.MONGODB_APP_PASSWORD,
                dbName: process.env.MONGODB_INIT_DATABASE || 'test',
                connectionName: process.env.MONGODB_CONNECTION_NAME || 'default',
                authSource: process.env.MONGODB_AUTH_SOURCE || process.env.MONGODB_INIT_DATABASE || 'test',
            }
        },
        mysql: {
            synchronize: true,
            insecureAuth: false,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            host: process.env.MYSQL_HOST || '127.0.0.1',
            database: process.env.MYSQL_DATABASE || 'app',
            port: parseInt(process.env.MYSQL_PORT) || 3306,
            autoLoadEntities: true,
        },
        sqlite: {
            synchronize: true,
            autoLoadEntities: true,
            database: process.env.SQLITE_DATABASE,
        },
        redis: {
            url: process.env.REDIS_URL,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        }
    }
}));
