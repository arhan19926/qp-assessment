import { PartialType } from '@nestjs/mapped-types';
import { CreateGroceryItemDto } from 'src/modules/grocery/dto/CreateGroceryItem.dto';

export class UpdateGroceryItemDto extends PartialType(CreateGroceryItemDto) {}
