import * as jwt from 'jsonwebtoken';

import { Encrypter } from 'src/types/cryptography';

export class JwtSignInAdapter implements Encrypter {
  constructor(private readonly secretKey: string) {
    if (!secretKey || secretKey.trim() === '') {
      throw new Error('Secret key must be provided and cannot be empty.');
    }
  }

  execute(userId: string, email: string): string {
    console.log(userId, email);
    const token = jwt.sign(
      { userId: userId, email: email, },
      this.secretKey,
      { expiresIn: '1h' }
    );

    return token;
  }
}
