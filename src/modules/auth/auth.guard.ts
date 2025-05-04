import {
  CanActivate, ExecutionContext, Injectable,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { UnauthorizedExceptionError } from 'src/errors/auth/UnanthorizedException';
import { makeJwtVerifyAdapter } from 'src/factories/infra/cryptography/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedExceptionError('Please provide a token.');
      }

      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await makeJwtVerifyAdapter().execute(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      this.logger.error('[Auth error] - ', error.message);
      throw new ForbiddenException(error.message || 'session expired! Please sign In');
    }
  }
}