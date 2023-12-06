/**
 * @Project : backend-nest
 * @File : src/entity-audit/edit-entity-audit.interceptor.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/16/2023
 * @Time : 12:24 PM
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class EditEntityAuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = {
      ...request.body,
      editedBy: request.user.email,
      editedAt: new Date().toLocaleString('en-GB'),
    };
    return next.handle();
  }
}
