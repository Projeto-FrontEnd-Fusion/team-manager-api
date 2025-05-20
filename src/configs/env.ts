import { config } from 'dotenv';

config();

export const env = {
  JWt_SECRET_KEY: process.env.JWt_SECRET_KEY || '',
  SECRET_KEY: process.env.SECRET_KEY || '',
  PORT: process.env.PORT || 8080,
};
