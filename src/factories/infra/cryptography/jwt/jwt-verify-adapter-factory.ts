import { JwtVerifyAdapter } from '@infra/cryptography/jwt';
import { Decrypter } from 'src/types/cryptography';

export const makeJwtVerifyAdapter = (): Decrypter => {
  return new JwtVerifyAdapter(process.env.JWT_TOKEN);
};
