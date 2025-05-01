import { JwtSignInAdapter } from "@infra/cryptography/jwt";
import { Encrypter } from "src/types/cryptography";


export const makeJwtSignInAdapter = (): Encrypter => {
  return new JwtSignInAdapter(process.env.JWT_TOKEN);
};
