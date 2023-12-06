/**
 * @Project : backend-nest
 * @File : src/entity-audit/create-entity-audit.interceptor.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/16/2023
 * @Time : 10:55 AM
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CreateEntityAuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = {
      ...request.body,
      createdBy: request.user.email,
      createdAt: new Date().toLocaleString('en-GB'),
    };
    return next.handle();
  }
}
