import {
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class OrderDto {
  @IsNumber()
  readonly userId: number;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsArray()
  @IsNumber({}, { each: true })
  readonly productIds: number[];

  @IsNumber()
  readonly quantity: number;

  readonly status: 'PENDING' | 'PAID' | 'CANCELLED';
}
