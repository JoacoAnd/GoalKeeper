import dotenv from 'dotenv';

dotenv.config();

const config = {
    general: {
        port: process.env.PORT || 3000
    },
    database: {
        atlas: process.env.MONGO_CONNECTION || 'mongodb://127.0.0.1:27017/test'
    },
    jwt: {
        secret: process.env.JWT_SECRET || "testSecretGoalkiper"
    }
};

export default config;