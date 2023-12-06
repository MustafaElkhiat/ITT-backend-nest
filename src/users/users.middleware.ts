import { Injectable, NestMiddleware } from '@nestjs/common';
import { encodePassword } from '../utilities/bcrypt';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const password = '0000';
    req.body = {
      ...req.body,
      isActive: false,
      isEnabled: true,
      password: encodePassword(password),
    };
    next();
  }
}
