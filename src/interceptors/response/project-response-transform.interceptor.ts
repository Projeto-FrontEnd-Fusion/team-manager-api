import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { map } from 'rxjs/operators';
import { ProjectEntity } from 'src/entities';

import { HttpProjectMapper } from 'src/mappers/HttpToDomain/http-project.mapper';

@Injectable()
export class ProjectResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<
    { data: ProjectEntity[] | [] | null, message?: string | null, statusCode: number }
  >) {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map(({ data, message, statusCode }) => {
        if (data instanceof Array) {
          if (data.length > 0) {
            return {
              data: { ...HttpProjectMapper.ArrayToHttp(data) },
              message: message,
              statusCode: statusCode,
            };
          }

          return {
            data: data,
            message: message,
            statusCode: statusCode
          }
        }

        return {
          data:
            (statusCode >= 200 && statusCode < 300)
              ? HttpProjectMapper.toHttp(data)
              : data,
          message: message,
          statusCode: statusCode,
        };
      }),
    );
  }
}
