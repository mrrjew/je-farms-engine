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
exports.PaymentService = void 0;
const paystack_sdk_1 = require("paystack-sdk");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const paystack = new paystack_sdk_1.Paystack(process.env.PAYSTACK_API_KEY);
let PaymentService = class PaymentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async initializeTransaction(dto, thisUser) {
        try {
            const { email, amount, orderId } = dto;
            const _isUser = thisUser == email;
            if (!_isUser) {
                throw new common_1.UnauthorizedException('Email does not correspond to current user');
            }
            console.log(orderId);
            const order = this.prisma?.order.findUnique({
                where: {
                    id: +orderId,
                },
            });
            if (!order) {
                throw new common_1.NotFoundException('Order does not exist');
            }
            const reference = (0, uuid_1.v4)();
            const response = await paystack.transaction.initialize({
                email,
                amount: String(amount * 100),
                reference,
                metadata: {
                    orderId,
                },
                callback_url: process.env.CALLBACK_URL,
                currency: 'GHS',
                channels: ['bank', 'card', 'mobile_money'],
            });
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Paystack initialization error: ${error}`);
        }
    }
    async verifyTransaction(reference) {
        try {
            const response = await paystack.transaction.verify(reference);
            console.log(response.data);
            if (response.data.status === 'success') {
                const orderId = response.data.metadata.orderId;
                console.log(orderId);
                const order = this.prisma?.order.findUnique({
                    where: {
                        id: +orderId,
                    },
                });
                if (!order) {
                    throw new common_1.NotFoundException('Order does not exist');
                }
                this.prisma?.order.update({
                    where: {
                        id: +orderId,
                    },
                    data: {
                        status: 'PAID',
                    },
                });
                return true;
            }
            return false;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Paystack verification error: ${error}`);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map