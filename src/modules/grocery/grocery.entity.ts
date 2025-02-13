import { baseEntity } from '../../utility/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Grocery extends baseEntity {
  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  category: string;

  @Column()
  unit: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: true })
  inStock: boolean;
}
