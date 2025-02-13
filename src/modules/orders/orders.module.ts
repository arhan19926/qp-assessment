import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { GroceryModule } from '../grocery/grocery.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), UsersModule, GroceryModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
