import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('exchanges_pk', ['id'], { unique: true })
@Entity('posts', { schema: 'public' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'content' })
  content: string;

  @Column('integer', { name: 'user_id' })
  userId: number;
}
