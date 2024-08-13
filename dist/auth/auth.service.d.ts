import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
