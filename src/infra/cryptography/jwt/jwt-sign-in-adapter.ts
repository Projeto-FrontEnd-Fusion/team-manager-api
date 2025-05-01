import jwt from 'jsonwebtoken';

import { Encrypter } from 'src/types/cryptography';

export class JwtSignInAdapter implements Encrypter {
  constructor(private readonly secretKey: string) { }

  execute(userId: string): string {
    const token = jwt.sign(
      { userId: userId },
      this.secretKey,
      { expiresIn: '1h' }
    );

    return token;
  }
}
