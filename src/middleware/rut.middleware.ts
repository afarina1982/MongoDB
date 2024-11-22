import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const rutUsuario = req.headers['rut_usuario'] as string;
    if (!rutUsuario) {
      throw new ForbiddenException('El header "rut_usuario" es obligatorio');
    }
    next();
  }
}
