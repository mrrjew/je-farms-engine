import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    profile(req: Request): Express.User;
    signup(dto: AuthDto): Promise<{
        token: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        userName: string | null;
        hash: string;
        isAdmin: boolean;
    }>;
    signin(dto: AuthDto): Promise<{
        token: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        userName: string | null;
        hash: string;
        isAdmin: boolean;
    }>;
}
