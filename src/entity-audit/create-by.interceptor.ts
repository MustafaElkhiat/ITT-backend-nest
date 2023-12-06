/**
 * @Project : backend-nest
 * @File : create-by.interceptor.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/29/2023
 * @Time : 9:25 AM
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CreateByInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = {
      ...request.body,
      createdBy: request.user.email,
    };
    return next.handle();
  }
}
