import { IsArray, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsUUID('4', { each: true })
  items: string[];

  orderNumber?: string;

  totalPrice?: number;

  status?: string;

  @IsUUID('4')
  userId: string;
}
