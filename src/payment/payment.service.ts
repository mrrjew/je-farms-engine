import { Paystack } from 'paystack-sdk';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { PaymentDto } from './dto/payment.dto';
import {
  InternalServerErrorException,
  // NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

const paystack = new Paystack(process.env.PAYSTACK_API_KEY);
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async initializeTransaction(
    dto: PaymentDto,
    thisUser: string,
  ): Promise<string | null> {
    try {
      const { email, amount, orderId } = dto;

      // Check if the email belongs to the user
      const _isUser = thisUser == email;

      if (!_isUser) {
        throw new UnauthorizedException(
          'Email does not correspond to current user',
        );
      }

      //Check if order exists
      // console.log(orderId);
      // const order = this.prisma?.order.findUnique({
      //   where: {
      //     id: +orderId,
      //   },
      // });

      // if (!order) {
      //   throw new NotFoundException('Order does not exist');
      // }

      const reference = uuidv4(); // Generate a unique reference for each transaction
      const response = await paystack.transaction.initialize({
        email,
        amount: String(amount * 100), // Paystack expects amount in kobo (1 NGN = 100 kobo)
        reference,
        metadata: {
          orderId,
        },
        callback_url: process.env.CALLBACK_URL,
        currency: 'GHS', // Specify the currency (in this case Ghanaian Cedis)
        channels: ['bank', 'card', 'mobile_money'], // Specify payment channels
      });

      console.log(response.data);
      return response.data; // Return the authorization URL for redirection
    } catch (error) {
      throw new InternalServerErrorException(
        `Paystack initialization error: ${error}`,
      );
    }
  }

  async verifyTransaction(reference: string): Promise<boolean> {
    try {
      const response = await paystack.transaction.verify(reference);

      console.log(response.data);

      if (response.data.status === 'success') {
        // Update the corresponding order in database
        const orderId = response.data.metadata.orderId;
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Paystack verification error: ${error}`,
      );
    }
  }
}
