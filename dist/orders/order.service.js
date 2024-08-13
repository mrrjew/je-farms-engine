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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllOrders() {
        return this.prisma.order.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        userName: true,
                        isAdmin: true,
                    },
                },
                products: true,
            },
        });
    }
    async getOrderById(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        userName: true,
                        isAdmin: true,
                    },
                },
                products: true,
            },
        });
    }
    async createOrder(orderDto) {
        const { userId, productIds, ...otherFields } = orderDto;
        return this.prisma.order.create({
            data: {
                products: {
                    connect: productIds.map((productId) => ({ id: productId })),
                },
                userId,
                ...otherFields,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        userName: true,
                        isAdmin: true,
                    },
                },
                products: true,
            },
        });
    }
    async updateOrder(id, orderDto) {
        const { userId, productIds, ...otherFields } = orderDto;
        return this.prisma.order.update({
            where: { id },
            data: {
                products: {
                    connect: productIds?.map((productId) => ({ id: productId })),
                },
                userId,
                ...otherFields,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        userName: true,
                        isAdmin: true,
                    },
                },
                products: true,
            },
        });
    }
    async deleteOrder(id) {
        return this.prisma.order.delete({
            where: { id },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map