    import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>(config.get('NODE_ENV') == 'development' ? 'DEV_DATABASE_URL' : 'PROD_DATABASE_URL'),
        },
      },
    });
  }
}