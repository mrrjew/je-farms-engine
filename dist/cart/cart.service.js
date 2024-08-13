"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCart(createCartDto) {
        const { userId } = createCartDto;
        const cart = await this.prisma.cart.create({
            data: {
                userId,
            },
        });
        return cart;
    }
    async addProductToCart(addProductDto) {
        const { cartId, productId, quantity, price } = addProductDto;
        const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const existingCartProduct = await this.prisma.cartProduct.findUnique({
            where: { cartId_productId: { cartId, productId } },
        });
        if (existingCartProduct) {
            throw new common_1.BadRequestException('Product already in cart');
        }
        const cartProduct = await this.prisma.cartProduct.create({
            data: {
                cartId,
                productId,
                quantity,
                price,
            },
        });
        return cartProduct;
    }
    async removeProductFromCart(id) {
        try {
            await this.prisma.cartProduct.delete({
                where: {
                    id,
                },
            });
            return `removed product ${id} from cart`;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error removing product from cart');
        }
    }
    async removeCart(id) {
        try {
            await this.prisma.cart.delete({
                where: {
                    id,
                },
            });
            return `removed cart ${id}`;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error removing cart');
        }
    }
    async getCart(id) {
        const cart = await this.prisma.cart.findUnique({
            where: { id },
            include: { cartProducts: { include: { product: true } } },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return cart;
    }
    async getAllCart() {
        const cart = await this.prisma.cart.findMany({
            include: { cartProducts: { include: { product: true } } },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return cart;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map