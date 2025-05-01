import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

import { HttpMemberMapper } from 'src/mappers/HttpToDomain/http-member.mapper';

@Injectable()
export class MemberResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(({ data, message, statusCode }) => {
        if (data instanceof Array && data.length > 0) {
          return {
            data: HttpMemberMapper.ArrayToHttp(data),
            message: message,
            statusCode: statusCode,
          };
        }

        return {
          data:
            statusCode > 199 && statusCode < 300
              ? HttpMemberMapper.toHttp(data)
              : data,
          message: message,
          statusCode: statusCode,
        };
      }),
    );
  }
}
