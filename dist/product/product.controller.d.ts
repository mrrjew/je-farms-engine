import { ProductService } from './product.service';
import { ProductDto } from './dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        href: string;
        alt: string;
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
        alt: string;
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
        alt: string;
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
        alt: string;
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
        alt: string;
        description: string | null;
        price: number;
        stock: number;
    }>;
}
