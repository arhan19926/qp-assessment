import { baseEntity } from 'src/utility/baseEntity';
import { Column, Entity } from 'typeorm';

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
}
