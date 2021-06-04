import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { secretKey } from 'src/main';
import { UserService } from './user.service';

@Injectable()
export class UserMiddleWare implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const payload = jwt.verify(token, secretKey);
        if (typeof payload === 'object' && payload.hasOwnProperty('id')) {
          try {
            const { user, ok, error } = await this.userService.getUserById({
              id: payload['id'],
            });
            req['user'] = user;
          } catch (error) {
            return { ok: false, error: 'No such user' };
          }
        }
      } catch (e) {}
    }
    next();
  }
}
