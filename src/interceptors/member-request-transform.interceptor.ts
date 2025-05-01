import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { DomainMemberMapper } from 'src/mappers/DomainToHttp/domain-member.mapper';

@Injectable()
export class MemberRequestTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      request.body = DomainMemberMapper.toDomain(request.body);
    }

    return next.handle();
  }
}
