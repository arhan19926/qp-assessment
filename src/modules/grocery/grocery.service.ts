import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGroceryItemDto } from 'src/modules/grocery/dto/UpdateGroceryItem.dto';
import { Grocery } from 'src/modules/grocery/grocery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(Grocery)
    private readonly groceryRepository: Repository<Grocery>,
  ) {}

  async processGetGroceryList() {
    try {
      console.log(`Inside GroceryService method processGetGroceryList`);
      return await this.groceryRepository.find();
    } catch (error) {
      console.log(
        `Error Occurred in Controller method processGetGroceryList:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async processCreateItem(payload: Partial<Grocery>) {
    try {
      console.log(`Inside GroceryService method processCreateItem`);
      const item = this.groceryRepository.create(payload);
      return await this.groceryRepository.save(item);
    } catch (error) {
      console.log(
        `Error Occurred in Controller method processCreateItem:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async processUpdateItemDetails(id: string, payload: UpdateGroceryItemDto) {
    try {
      console.log(`Inside GroceryService method processUpdateItemDetails`);
      const result = await this.groceryRepository.update(id, payload);
      if (result.affected === 0) {
        throw new NotFoundException(`Grocery item with ID ${id} not found`);
      }
      return {
        message: 'Grocery item updated successfully',
        rowsAffected: result,
      };
    } catch (error) {
      console.log(
        `Error Occurred in Controller method processUpdateItemDetails:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }
}
