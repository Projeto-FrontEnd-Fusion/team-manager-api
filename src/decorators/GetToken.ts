import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UnauthorizedExceptionError } from 'src/errors/auth/UnanthorizedException';

export const GetToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token || token.trim() === '') {
      throw new UnauthorizedExceptionError();
    }

    return token;
  },
);
