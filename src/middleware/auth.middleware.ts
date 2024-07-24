import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

interface IJwt {
  id: number;
  otherFields: jwt.JwtPayload;
}

@Injectable()
export class JwtMiddleWare implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as IJwt;
        const user = await this.prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });

        if (!user) {
          throw new BadRequestException('User not found');
        }

        delete user.hash;

        req['user'] = user;
      } catch (error) {
        throw new BadRequestException('The token is faulty');
      }
    } else {
      throw new BadRequestException('Authorization header missing or malformed');
    }

    next();
  }
}
