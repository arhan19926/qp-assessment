import { Orders } from '../orders/orders.entity';
import { baseEntity } from '../../utility/baseEntity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
@Entity()
export class User extends baseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  image: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: string;

  @OneToMany(() => Orders, (order) => order.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Orders[];
}
