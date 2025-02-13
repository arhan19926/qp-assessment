import {
  InventoryAction,
  ManageInventoryDto,
} from './dto/ ManageInventory.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGroceryItemDto } from './dto/UpdateGroceryItem.dto';
import { Grocery } from './grocery.entity';
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
        `Error Occurred in Service method processGetGroceryList:${error?.message || 'unknown'}`,
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
        `Error Occurred in Service method processCreateItem:${error?.message || 'unknown'}`,
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
        `Error Occurred in Service method processUpdateItemDetails:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async processManageInventory(manageInventoryDto: ManageInventoryDto) {
    try {
      console.log(`Inside GroceryService method processManageInventory`);
      const item = await this.groceryRepository.findOne({
        where: { id: manageInventoryDto.id },
      });

      if (!item) {
        throw new NotFoundException(
          `Grocery item with ID ${manageInventoryDto.id} not found`,
        );
      }

      switch (manageInventoryDto.action) {
        case InventoryAction.INCREASE:
          if (!manageInventoryDto?.quantity)
            throw new BadRequestException('Quantity is required');
          item.quantity += manageInventoryDto?.quantity;
          await this.groceryRepository.save(item);
          return {
            message: 'Stock increased successfully',
            stock: item.quantity,
          };

        case InventoryAction.DECREASE:
          if (!manageInventoryDto?.quantity)
            throw new BadRequestException('Quantity is required');
          if (item.quantity < manageInventoryDto?.quantity)
            throw new BadRequestException('Insufficient stock');
          item.quantity -= manageInventoryDto?.quantity;
          await this.groceryRepository.save(item);
          return {
            message: 'Stock reduced successfully',
            stock: item.quantity,
          };

        case InventoryAction.CHECK:
          return { name: item.name, stock: item.quantity };

        default:
          throw new BadRequestException('Invalid action');
      }
    } catch (error) {
      console.log(
        `Error Occurred in Service method processManageInventory:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async processRemoveItem(id: string) {
    try {
      console.log(`Inside GroceryService method processRemoveItem`);
      const item = await this.groceryRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException(`Grocery item with ID ${id} not found`);
      }
      await this.groceryRepository.softDelete(id);
      return { message: 'Grocery item deleted successfully' };
    } catch (error) {
      console.log(
        `Error Occurred in Service method processRemoveItem:${error?.message || 'unknown'}`,
      );
      throw error;
    }
  }

  async findGroceryItems(groceryIds: string[]) {
    try {
      console.log(`Inside Grocery Service Method findOne`);
      const items = await this.groceryRepository
        .createQueryBuilder('grocery')
        .where('grocery.id IN (:...ids)', { ids: groceryIds })
        .getMany();
      return items;
    } catch (error) {
      console.log(
        `Error Occurred in Grocery Service method findOne:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }
}
