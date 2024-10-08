import { OrderDto } from './dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAllOrders(): Promise<({
        user: {
            email: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userName: string;
            isAdmin: boolean;
        };
        products: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            href: string;
            description: string | null;
            price: number;
            stock: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.Status;
        quantity: number;
    })[]>;
    getOrderById(id: number): Promise<{
        user: {
            email: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userName: string;
            isAdmin: boolean;
        };
        products: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            href: string;
            description: string | null;
            price: number;
            stock: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.Status;
        quantity: number;
    }>;
    createOrder(orderDto: OrderDto): Promise<{
        user: {
            email: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userName: string;
            isAdmin: boolean;
        };
        products: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            href: string;
            description: string | null;
            price: number;
            stock: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.Status;
        quantity: number;
    }>;
    updateOrder(id: number, orderDto: Partial<OrderDto>): Promise<{
        user: {
            email: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userName: string;
            isAdmin: boolean;
        };
        products: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            href: string;
            description: string | null;
            price: number;
            stock: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.Status;
        quantity: number;
    }>;
    deleteOrder(id: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        status: import(".prisma/client").$Enums.Status;
        quantity: number;
    }>;
}
