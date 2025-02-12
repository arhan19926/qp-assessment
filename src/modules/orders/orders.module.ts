import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/modules/orders/orders.entity';
import { GroceryModule } from 'src/modules/grocery/grocery.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), UsersModule, GroceryModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
