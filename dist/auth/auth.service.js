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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async signup(dto) {
        try {
            const { password, email, ...otherFields } = dto;
            const hash = await argon2.hash(password);
            const user = await this.prismaService.user.create({
                data: {
                    ...otherFields,
                    email: dto.email,
                    hash
                },
            });
            delete user.hash;
            const cart = await this.prismaService.cart.create({
                data: {
                    userId: user.id
                }
            });
            console.log(cart);
            const finalUser = await this.prismaService.user.update({
                where: {
                    id: user.id
                }, data: { cartId: cart.id }
            });
            const token = jwt.sign(finalUser, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY,
            });
            const _user = { ...finalUser, token };
            console.log(_user);
            return _user;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Credentials incorrect');
        }
        const pwMatches = await argon2.verify(user.hash, dto.password);
        if (!pwMatches) {
            throw new common_1.ForbiddenException('Credentials incorrect');
        }
        delete user.hash;
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });
        const _user = { ...user, token };
        return _user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map