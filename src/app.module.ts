import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { GroceryModule } from './modules/grocery/grocery.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [DatabaseModule, UsersModule, GroceryModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
