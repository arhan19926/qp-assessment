import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryItemDto } from 'src/modules/grocery/dto/CreateGroceryItem.dto';
import { UpdateGroceryItemDto } from 'src/modules/grocery/dto/UpdateGroceryItem.dto';

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
    console.log(`Received Request to Update grocery item ${id} details`);
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
}
