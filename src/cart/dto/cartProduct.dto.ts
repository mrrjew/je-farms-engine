import { IsInt, IsNumber } from 'class-validator';

export class AddProductDto {
  @IsInt()
  cartId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}
