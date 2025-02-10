export class CreateGroceryItemDto {
  name: string;

  price: number;

  category?: string;

  quantity?: number;

  inStock?: boolean;
}
