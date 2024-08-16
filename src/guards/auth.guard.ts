import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

interface IJwt {
  id: number;
  otherFields: jwt.JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException(
        'Authorization header missing or malformed',
      );
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as IJwt;
      console.log("decoded",decoded)
      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      delete user.hash; // Assuming `hash` is a sensitive field you don't want to expose

      req.user = user; // Attach user object to the request for downstream handlers/controllers
      return true;
    } catch (error) {
      console.log(error)
      throw new BadRequestException('The token is faulty');
    }
  }
}
