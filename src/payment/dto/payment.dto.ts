import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
