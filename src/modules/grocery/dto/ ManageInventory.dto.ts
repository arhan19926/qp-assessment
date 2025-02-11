import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export enum InventoryAction {
  INCREASE = 'increase',
  DECREASE = 'decrease',
  CHECK = 'check',
}

export class ManageInventoryDto {
  @IsNotEmpty()
  id: string;

  @IsEnum(InventoryAction)
  action: InventoryAction;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}
