import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto, AddProductDto } from './dto'; // Import your DTOs

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async createCart(createCartDto: CreateCartDto) {
    const { userId } = createCartDto;

    // Create a new cart for the user
    const cart = await this.prisma.cart.create({
      data: {
        userId,
      },
    });

    return cart;
  }

  async addProductToCart(addProductDto: AddProductDto) {
    const { cartId, productId, quantity, price } = addProductDto;

    // Check if the cart exists
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Check if the product is already in the cart
    const existingCartProduct = await this.prisma.cartProduct.findUnique({
      where: { cartId_productId: { cartId, productId } },
    });

    if (existingCartProduct) {
      throw new BadRequestException('Product already in cart');
    }

    // Add product to the cart
    const cartProduct = await this.prisma.cartProduct.create({
      data: {
        cartId,
        productId,
        quantity,
        price,
      },
      include:{product:true},
    });

    return cartProduct;
  }

  async removeProductFromCart(cartId: number, productId: number) {
    try {
      await this.prisma.cartProduct.delete({
        where: {
          cartId_productId: {
            cartId,
            productId
          },
        },
      });
  
      return `Removed product ${productId} from cart ${cartId}`;
    } catch (error) {
      throw new NotFoundException('Error removing product from cart');
    }
  }
  

  async removeCart(id: number) {
    try {
      await this.prisma.cart.delete({
        where: {
          id,
        },
      });

      return `removed cart ${id}`;
    } catch (error) {
      throw new NotFoundException('Error removing cart');
    }
  }
  async getCart(id: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: { cartProducts: { include: { product: true } } },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async getAllCart() {
    const cart = await this.prisma.cart.findMany({
      include: { cartProducts: { include: { product: true } } },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }
}
