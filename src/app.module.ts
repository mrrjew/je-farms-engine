import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleWare } from './middleware/auth.middleware';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    JwtModule.register({
    secret:"jefarms",
    signOptions:{expiresIn:process.env.JWT_EXPIRY}
  }),
    AuthModule,ProductModule,OrderModule],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(JwtMiddleWare).forRoutes('*')
  }
}
