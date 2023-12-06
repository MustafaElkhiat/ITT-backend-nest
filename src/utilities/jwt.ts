/**
 * @Project : backend-nest
 * @File : src/utilities/jwt.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/16/2023
 * @Time : 11:05 AM
 */

import { Request } from 'express';

export function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
