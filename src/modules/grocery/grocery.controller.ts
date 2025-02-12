import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryItemDto } from 'src/modules/grocery/dto/CreateGroceryItem.dto';
import { UpdateGroceryItemDto } from 'src/modules/grocery/dto/UpdateGroceryItem.dto';
import { ManageInventoryDto } from 'src/modules/grocery/dto/ ManageInventory.dto';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Get('list')
  async getGroceryList() {
    console.log(`Received Request to get grocery list`);
    try {
      const result = await this.groceryService.processGetGroceryList();
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method getGroceryList:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }

  @Post('add')
  async createItem(@Body() createGroceryItemDto: CreateGroceryItemDto) {
    console.log(`Received Request to Create grocery item`);
    try {
      const result =
        await this.groceryService.processCreateItem(createGroceryItemDto);
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method createItem:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }

  @Patch('update')
  async updateItemDetails(
    @Body() updateGroceryItemDto: UpdateGroceryItemDto,
    @Query('id') id: string,
  ) {
    console.log(`Received Request to Update grocery item with id: ${id} `);
    try {
      const result = await this.groceryService.processUpdateItemDetails(
        id,
        updateGroceryItemDto,
      );
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method updateItemDetails:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }

  @Patch('manageInventory')
  async manageInventory(@Body() manageInventoryDto: ManageInventoryDto) {
    console.log(
      `Received Request to Manage Inventory for grocery item ${manageInventoryDto.id}`,
    );
    try {
      const result =
        await this.groceryService.processManageInventory(manageInventoryDto);
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method manageInventory:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }

  @Delete('delete')
  async removeItem(@Query('id') id: string) {
    console.log(`Received Request to Remove Item with id: ${id}`);
    try {
      const result = await this.groceryService.processRemoveItem(id);
      return result;
    } catch (error) {
      console.log(
        `Error Occurred in Controller method removeItem:${error?.message || 'unknown'}`,
      );
      throw new InternalServerErrorException(
        error?.message || 'Unkown error Occured',
      );
    }
  }
}
