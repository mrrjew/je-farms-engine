import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './orders/order.module';
import { CartModule } from './cart/cart.module';
import { PrismaService } from './prisma/prisma.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, ProductModule, OrderModule, CartModule, PaymentModule],
  providers: [PrismaService],
})
export class AppModule {}
