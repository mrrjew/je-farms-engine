import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as per your project structure
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProducts() {
    return this.prismaService.product.findMany();
  }

  async getProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(productDto: ProductDto) {
    return this.prismaService.product.create({
      data: productDto,
    });
  }

  async updateProduct(id: number, productDto: Partial<ProductDto>) {
    const existingProduct = await this.getProductById(id); 

    if(!existingProduct){
        throw new NotFoundException(`Product with ID ${id} not found`)
    }

    return this.prismaService.product.update({
      where: { id },
      data: {...productDto},
    });
  }

  async deleteProduct(id: number) {
    const existingProduct = await this.getProductById(id); 

    if(!existingProduct){
        throw new NotFoundException(`Product with ID ${id} not found`)
    }

    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
