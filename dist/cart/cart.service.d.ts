import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto, AddProductDto } from './dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCart(createCartDto: CreateCartDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        productId: number | null;
    }>;
    addProductToCart(addProductDto: AddProductDto): Promise<{
        id: number;
        cartId: number;
        productId: number;
        quantity: number;
        price: number;
    }>;
    removeProductFromCart(id: number): Promise<string>;
    removeCart(id: number): Promise<string>;
    getCart(id: number): Promise<{
        cartProducts: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                href: string;
                alt: string;
                description: string | null;
                price: number;
                stock: number;
            };
        } & {
            id: number;
            cartId: number;
            productId: number;
            quantity: number;
            price: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        productId: number | null;
    }>;
    getAllCart(): Promise<({
        cartProducts: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                href: string;
                alt: string;
                description: string | null;
                price: number;
                stock: number;
            };
        } & {
            id: number;
            cartId: number;
            productId: number;
            quantity: number;
            price: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        productId: number | null;
    })[]>;
}
