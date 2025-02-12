import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryService } from 'src/modules/grocery/grocery.service';
import { CreateOrderDto } from 'src/modules/orders/dto/createOrder.dto';
import { Orders, OrderStatus } from 'src/modules/orders/orders.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    private readonly usersService: UsersService,
    private readonly groceryService: GroceryService,
  ) {}

  async processCreateOrder(payload: CreateOrderDto) {
    try {
      console.log(`Inside OrderService method processCreateOrder`);
      payload.orderNumber = `ORD-${Date.now()}`;

      const { items, status, userId } = payload;
      let totalPrice = 0;
      // Validate User Exists
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Fetch Grocery Items by IDs to maintain Many-to-Many relation
      const groceries = await this.groceryService.findGroceryItems(items);

      if (groceries.length !== items.length) {
        throw new NotFoundException('Some grocery items were not found');
      }

      for (const obj of groceries) {
        totalPrice += Number(obj.price);
      }

      payload.status = OrderStatus.PENDING;
      // Create Order and store references correctly
      const order = this.orderRepository.create({
        orderNumber: `ORD-${Date.now()}`, // Generate a unique order number
        user,
        userId, // Store only the User ID
        items: groceries, // This links to the junction table, not storing full objects
        totalPrice,
        status,
      });

      return await this.orderRepository.save(order);
      //   const order = this.orderRepository.create(payload);
      //   return await this.orderRepository.save(order);
    } catch (error) {
      console.log(
        `Error Occurred in Service method processCreateOrder:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async processGetOrdersList() {
    try {
      console.log(`Inside OrderService method processGetOrdersList`);
      const orders = await this.orderRepository.find({ relations: ['items'] });
      return orders;
    } catch (error) {
      console.log(
        `Error Occurred in Service method processGetOrdersList:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }
}
