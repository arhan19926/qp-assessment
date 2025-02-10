import { Grocery } from 'src/modules/grocery/grocery.entity';
import { User } from 'src/modules/users/users.entity';
import { baseEntity } from 'src/utility/baseEntity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Orders extends baseEntity {
  @Column({ unique: true })
  orderNumber: string;

  @ManyToMany(() => Grocery)
  @JoinTable()
  items: Grocery[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.order)
  user: User;
}
