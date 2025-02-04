import 'dotenv/config';

export const EnvConfig = {
  database: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: +process.env.POSTGRES_PORT,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    PGDATA: process.env.PGDATA,
  },
  ENVIRONMENT: process.env.NODE_ENV,
};
//environment
