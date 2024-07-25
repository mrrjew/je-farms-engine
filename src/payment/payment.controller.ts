import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('initialize')
  initializePayment(@Body() dto: PaymentDto, @Req() req: Request) {
    return this.paymentService.initializeTransaction(dto, req['user'].email);
  }

  @Post('verify/:reference')
  verifyPayment(@Param('reference') reference: string) {
    return this.paymentService.verifyTransaction(reference);
  }
}
