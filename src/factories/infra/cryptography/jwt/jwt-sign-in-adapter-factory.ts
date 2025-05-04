import { env } from "@configs/env";
import { JwtSignInAdapter } from "@infra/cryptography/jwt";
import { Encrypter } from "src/types/cryptography";

export const makeJwtSignInAdapter = (): Encrypter => {
  console.log(env.JWt_SECRET_KEY)
  return new JwtSignInAdapter(env.JWt_SECRET_KEY);
};
