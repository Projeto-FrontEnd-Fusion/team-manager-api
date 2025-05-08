import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Either, left, right } from '@utils/either';
import { LoginDto } from './dto/Login.dto';
import { PrismaService } from '@infra/database/prisma/helpers/prisma.service';
import { makeHashGeneratorAdapter } from 'src/factories/infra/cryptography/bcrypt';
import { WrongPasswordError } from 'src/errors/user/WrongPassword';
import { makeJwtSignInAdapter } from 'src/factories/infra/cryptography/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWt_SECRET_KEY,
    });
  }

  async login({ email, password }: LoginDto): Promise<
    Either<WrongPasswordError | NotFoundException | Error, any>
  > {
    const userExists = await this.prismaService.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!userExists) return left(new NotFoundException());

    const passwordMatches = makeHashGeneratorAdapter().matches(
      password,
      userExists.password,
    );

    if (!passwordMatches) return left(new WrongPasswordError());

    const token = makeJwtSignInAdapter().execute(userExists.id, email);

    if (!token) return left(new BadRequestException());

    this.logger.log(`[AuthService - ${new Date().toLocaleString()}] User ${userExists.id} logged in.`)

    return right(token);
  }

  async logout(token: string): Promise<Either<Error, any>> {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: { token: token },
      });

      if (!userExists) return left(new NotFoundException());

      const updatedUser = await this.prismaService.user.update({
        where: { id: userExists.id },
        data: {
          token: null,
        },
      });

      this.logger.log(`[AuthService - ${new Date().toLocaleString()}] User ${updatedUser.id} logout.`)

      return right();
    } catch (err) {
      this.logger.error(`[AuthService - ${new Date().toLocaleString()}] `, err);
      return left(new Error(err.message));
    }
  }
}
