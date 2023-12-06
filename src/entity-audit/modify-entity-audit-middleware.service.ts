/**
 * @Project : backend-nest
 * @File : src/entity-audit/modify-entity-audit-middleware.service.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/15/2023
 * @Time : 10:09 AM
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ModifyEntityAuditMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.body = {
      ...req.body,
      editedAt: new Date().toLocaleString('en-GB'),
    };
    next();
  }
}
