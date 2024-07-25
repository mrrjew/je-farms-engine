// src/orders/order.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderDto } from './dto';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Post('create')
  createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Patch('update/:id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderDto: Partial<OrderDto>,
  ) {
    return this.orderService.updateOrder(id, orderDto);
  }

  @Delete('delete/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
