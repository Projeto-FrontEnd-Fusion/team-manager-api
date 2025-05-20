import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Logger,
} from '@nestjs/common';

import { UnauthorizedExceptionError } from 'src/errors/auth/UnanthorizedException';
import { makeJwtVerifyAdapter } from 'src/factories/infra/cryptography/jwt';

// Verifica se quem está fazendo o request é o mesmo do usuário que será alterado
@Injectable()
export class SelfUpdateGuard implements CanActivate {
  private readonly logger = new Logger(SelfUpdateGuard.name);

  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedExceptionError();
      }

      const authToken = authorization.replace(/bearer/gim, '').trim();
      const { email, userId } = await makeJwtVerifyAdapter().execute(authToken);

      // Adiciona os dados decodificados ao request
      request.decodedData = { email, userId };

      // Verifica se o ID do usuário no token corresponde ao ID no corpo da requisição ou nos parâmetros
      console.log(userId);
      const userIdFromRequest = request.body?.userId || request.params?.userId;

      if (!userIdFromRequest || userId !== userIdFromRequest) {
        throw new ForbiddenException(
          "Você não está autorizado para modificar dados de outro usuário.",
        );
      }

      return true;
    } catch (error) {
      this.logger.error(`[SelfUpdateGuard error ${new Date().toLocaleString()}] - `, error.message);
      throw new ForbiddenException(error.message || 'Access denied.');
    }
  }
}
