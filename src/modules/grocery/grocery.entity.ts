import { baseEntity } from 'src/utility/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Grocery extends baseEntity {
  @Column()
  name: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: true })
  inStock: boolean;
}
