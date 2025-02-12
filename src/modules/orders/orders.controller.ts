import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/modules/orders/dto/createOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('list')
  async getOrdersList() {
    console.log(`Received Request to get Orders list`);
    try {
      const result = await this.ordersService.processGetOrdersList();
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method getOrdersList:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }

  @Post('add')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log(`Received Request to Create grocery item`);
    try {
      const result =
        await this.ordersService.processCreateOrder(createOrderDto);
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method createOrder:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }
}
