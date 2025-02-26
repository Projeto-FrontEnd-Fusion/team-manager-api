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
      map((data) => {
        console.log(data);
        if (data instanceof Array && data.length > 0) {
          return HttpMemberMapper.ArrayToHttp(data);
        }
        return HttpMemberMapper.toHttp(data);
      }),
    );
  }
}
