import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      const hash = await argon2.hash(dto.password);

      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      const _user = { ...user, token };
      return _user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon2.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete user.hash;

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    const _user = { ...user, token };
    return _user;
  }
}
