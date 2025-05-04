import { UserService } from "@modules/users/user.service";
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Either, left, right } from "@utils/either";
import { LoginDto } from "./dto/Login.dto";
import { PrismaService } from "@infra/database/prisma/helpers/prisma.service";
import { makeHashGeneratorAdapter } from "src/factories/infra/cryptography/bcrypt";
import { WrongPasswordError } from "src/errors/user/WrongPassword";
import { makeJwtSignInAdapter } from "src/factories/infra/cryptography/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  validateToken(token: string) {
    return this.jwtService.verify(
      token, {
      secret: process.env.JWt_SECRET_KEY
    });
  }

  async login({ email, password }: LoginDto): Promise<
    Either<WrongPasswordError | NotFoundException | Error, any>
  > {
    const existsUser = await this.prismaService.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        password: true,
      }
    });

    if (!existsUser) return left(
      new NotFoundException(),
    )

    const passwordMatches = makeHashGeneratorAdapter().matches(password, existsUser.password)

    if (!passwordMatches) return left(
      new WrongPasswordError()
    );

    const token = makeJwtSignInAdapter().execute(existsUser.id, email);

    if (!token) return left(
      new BadRequestException()
    )

    return right(token)
  }

  async logout(token: string): Promise<Either<Error, any>> {
    try {
      const userExists = await this.prismaService.user.findFirst({
        where: { token: token }
      })

      if (!userExists) return left(
        new NotFoundException(),
      )

      await this.prismaService.user.update({
        where: { id: userExists.id },
        data: {
          token: null,
        }
      })

      return right({
        data: null,
        message: "Logout bem sucedido.",
        statusCode: HttpStatus.OK
      });

    } catch (err) {
      return left(new Error(err.message));
    }
  }
}