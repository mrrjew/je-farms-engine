import { CartService } from './cart.service';
import { AddProductDto } from './dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addProductToCart(addProductDto: AddProductDto): Promise<{
        product: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            href: string;
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
    }>;
    removeProductFromCart(cartId: number, productId: number): Promise<string>;
    removeCart(id: number): Promise<string>;
    getCart(id: number): Promise<{
        cartProducts: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                href: string;
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
