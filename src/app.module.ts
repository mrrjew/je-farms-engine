import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { JwtMiddleWare } from './middleware/auth.middleware';
import { OrderModule } from './orders/order.module';
import { CartModule } from './cart/cart.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,ProductModule,OrderModule,CartModule],
    providers:[PrismaService]
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(JwtMiddleWare).forRoutes({path:'*', method:RequestMethod.ALL})
  }
}
