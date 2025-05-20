import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { DomainMemberMapper } from 'src/mappers';

@Injectable()
export class MemberRequestTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      if (request.method == 'POST' || 'PATCH') {
        request.body = {
          ...DomainMemberMapper.toDomain({
            ...request.body,
            hardSkills: undefined,
            softSkills: undefined,
          }),
          hardSkills: request.body.hardSkills,
          softSkills: request.body.softSkills
        }
        return next.handle();
      }
      request.body = DomainMemberMapper.toDomain(request.body);
    }
    return next.handle();
  }
}
