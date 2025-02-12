import { Grocery } from 'src/modules/grocery/grocery.entity';
import { User } from 'src/modules/users/users.entity';
import { baseEntity } from 'src/utility/baseEntity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Orders extends baseEntity {
  @Column({ unique: true })
  orderNumber: string;

  @ManyToMany(() => Grocery)
  @JoinTable()
  items: Grocery[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: string;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @Column()
  userId: string;
}
