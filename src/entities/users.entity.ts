import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('users_pk', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('integer', { name: 'age' })
  age: number;
}
