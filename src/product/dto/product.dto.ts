import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  
  @IsNotEmpty()
  @IsString()
  readonly href: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly stock: number;
}
