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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllProducts() {
        return this.prismaService.product.findMany();
    }
    async getProductById(id) {
        const product = await this.prismaService.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async createProduct(productDto) {
        return this.prismaService.product.create({
            data: productDto,
        });
    }
    async updateProduct(id, productDto) {
        const existingProduct = await this.getProductById(id);
        if (!existingProduct) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return this.prismaService.product.update({
            where: { id },
            data: { ...productDto },
        });
    }
    async deleteProduct(id) {
        const existingProduct = await this.getProductById(id);
        if (!existingProduct) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return this.prismaService.product.delete({
            where: { id },
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map