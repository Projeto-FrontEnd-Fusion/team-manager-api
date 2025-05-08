import * as jwt from 'jsonwebtoken';

export class JwtVerifyAdapter {
  constructor(private readonly secretKey: string) {}

  async execute(
    token: string,
  ): Promise<null | { email: string; userId: string }> {
    try {
      const { email, userId }: any = jwt.verify(token, this.secretKey);
      if (!email) return null;
      if (!userId) return null;
      return { email, userId };
    } catch (err: any) {
      const errors = [
        'JsonWebTokenError',
        'NotBeforeError',
        'TokenExpiredError',
        'SyntaxError',
      ];
      for (const name of errors) {
        if (err.name === name) {
          return null;
        }
      }
      throw new Error(err.message);
    }
  }
}
