import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpProjectEntity } from 'src/entities';

import { DomainProjectMapper } from 'src/mappers/DomainToHttp/domain-project.mapper';

@Injectable()
export class ProjectRequestTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.method == 'PATCH') {
      request.body = {
        ...DomainProjectMapper.toDomain(request.body),
        members: request.body.members ? request.body['members'] : undefined
      }

      return next.handle();
    }

    if (request.body) {
      request.body = DomainProjectMapper.toDomain(request.body);
    }

    return next.handle();
  }
}
