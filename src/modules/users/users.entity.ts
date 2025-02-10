import { Orders } from 'src/modules/orders/orders.entity';
import { baseEntity } from 'src/utility/baseEntity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class User extends baseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: '' })
  image: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Orders, (order) => order.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Orders[];
}
