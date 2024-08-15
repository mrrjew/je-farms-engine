import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto';
export declare class ProductService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllProducts(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        href: string;
        description: string | null;
        price: number;
        stock: number;
    }[]>;
    getProductById(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        href: string;
        description: string | null;
        price: number;
        stock: number;
    }>;
    createProduct(productDto: ProductDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        href: string;
        description: string | null;
        price: number;
        stock: number;
    }>;
    updateProduct(id: number, productDto: Partial<ProductDto>): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        href: string;
        description: string | null;
        price: number;
        stock: number;
    }>;
    deleteProduct(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        href: string;
        description: string | null;
        price: number;
        stock: number;
    }>;
}
