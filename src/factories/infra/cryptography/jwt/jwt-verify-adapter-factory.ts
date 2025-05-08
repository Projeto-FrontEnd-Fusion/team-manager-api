import { env } from '@configs/env';
import { JwtVerifyAdapter } from '@infra/cryptography/jwt';
import { Decrypter } from 'src/types/cryptography';

export const makeJwtVerifyAdapter = (): Decrypter => {
  return new JwtVerifyAdapter(env.JWt_SECRET_KEY);
};
