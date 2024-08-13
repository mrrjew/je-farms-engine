import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    initializePayment(dto: PaymentDto, req: Request): Promise<{
        authorization_url: string;
        access_code: string;
        reference: string;
    }>;
    verifyPayment(reference: string): Promise<boolean>;
}
