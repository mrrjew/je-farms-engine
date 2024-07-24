import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as per your project structure
import { OrderDto } from './dto/order.dto'; // Assuming this is the correct path to your OrderDto

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders(){
    return this.prisma.order.findMany({include:{
        user:{
            select:{
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                userName:true,
                isAdmin:true
            }
        },
        products:true
    }});
  }

  async getOrderById(id: number){
    return this.prisma.order.findUnique({
      where: { id },
      include:{
        user:{
            select:{
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                userName:true,
                isAdmin:true
            }
        },
        products:true
      }
    });
  }

  async createOrder(orderDto: OrderDto){
    const {userId,productIds,...otherFields} = orderDto

    return this.prisma.order.create({
        data: {
          products:{
              connect:productIds.map(productId => ({id:productId}))
          },
          userId,
          ...otherFields
        },
        include:{
            user:{
                select:{
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    email: true,
                    userName:true,
                    isAdmin:true
                }
            },
          products:true
        }
      });;
  }

  async updateOrder(id: number, orderDto: Partial<OrderDto>){
    
    const {userId,productIds,...otherFields} = orderDto

    return this.prisma.order.update({
      where: { id },
      data: {
        products:{
            connect:productIds?.map(productId => ({id:productId}))
        },
        userId,
        ...otherFields
      },
      include:{
        user:{
            select:{
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                userName:true,
                isAdmin:true
            }
        },
        products:true
      }
    });
  }

  async deleteOrder(id: number){
    return this.prisma.order.delete({
      where: { id }
    });
  }
}
