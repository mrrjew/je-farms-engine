import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() productDto: ProductDto) {
    return this.productService.createProduct(productDto);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productDto: Partial<ProductDto>,
  ) {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
