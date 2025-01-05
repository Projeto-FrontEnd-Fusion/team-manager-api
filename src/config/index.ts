import "dotenv/config";

export const EnvConfig = {
  database: {
    MONGO_URL_DEVELOPMENT: process.env.MONGO_URL_ATLAS_DEVELOPMENT,
    MONGO_URL_PRODUCTION: process.env.MONGO_URL_ATLAS_PRODUCTION,
  },
  ENVIRONMENT: process.env.NODE_ENV,
  PORT: +process.env.APP_PORT
};
//environment