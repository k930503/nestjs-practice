import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('products_pk', ['id'], { unique: true })
@Entity('post_comments', { schema: 'public' })
export class PostComments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'content' })
  content: string;

  @Column('integer', { name: 'parent_id', nullable: true })
  parentId: number | null;

  @Column('integer', { name: 'user_id' })
  userId: number;

  @Column('integer', { name: 'post_id' })
  postId: number;
}
