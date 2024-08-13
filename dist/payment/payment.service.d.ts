import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentDto } from './dto/payment.dto';
export declare class PaymentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    initializeTransaction(dto: PaymentDto, thisUser: string): Promise<{
        authorization_url: string;
        access_code: string;
        reference: string;
    }>;
    verifyTransaction(reference: string): Promise<boolean>;
}
