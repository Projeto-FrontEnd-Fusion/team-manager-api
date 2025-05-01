import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

import { HttpProjectMapper } from 'src/mappers/HttpToDomain/http-project.mapper';

@Injectable()
export class ProjectResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(({ data, message, statusCode }) => {
        if (data instanceof Array && data.length > 0) {
          return {
            data: HttpProjectMapper.ArrayToHttp(data),
            message: message,
            statusCode: statusCode,
          };
        }

        return {
          data:
            statusCode > 199 && statusCode < 300
              ? HttpProjectMapper.toHttp(data)
              : data,
          message: message,
          statusCode: statusCode,
        };
      }),
    );
  }
}
