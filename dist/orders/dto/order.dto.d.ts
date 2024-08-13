export declare class OrderDto {
    readonly userId: number;
    readonly productIds: number[];
    readonly quantity: number;
    readonly status: 'PENDING' | 'PAID' | 'CANCELLED';
}
