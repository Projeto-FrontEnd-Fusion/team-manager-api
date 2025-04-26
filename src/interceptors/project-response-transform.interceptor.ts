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
      map((data) => {
        if (data instanceof Array && data.length > 0) {
          return HttpProjectMapper.ArrayToHttp(data);
        }
        return HttpProjectMapper.toHttp(data);
      }),
    );
  }
}
