import { Body, Controller, Post, Get, Param, Put, ParseIntPipe, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, AddProductDto} from './dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  async createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Post('add-product')
  async addProductToCart(@Body() addProductDto: AddProductDto) {
    return this.cartService.addProductToCart(addProductDto);
  }

  @Delete('remove-product/:id')
  async removeProductFromCart(@Param('id', ParseIntPipe) id:number) {
    return this.cartService.removeProductFromCart(id);
  }

  @Delete('remove/:id')
  async removeCart(@Param('id', ParseIntPipe) id:number) {
    return this.cartService.removeCart(id);
  }

  @Get(':id')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.getCart(id);
  }
}
