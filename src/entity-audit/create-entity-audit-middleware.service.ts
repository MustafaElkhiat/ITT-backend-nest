import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CreateEntityAuditMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.body = {
      ...req.body,
      createdAt: new Date().toLocaleString('en-GB'),
    };
    next();
  }
}
