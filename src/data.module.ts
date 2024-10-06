import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity';
import { Posts } from './posts/entities/posts.entity';
import { PostComments } from './post-comments/entities/post-comments.entity';
import { UsersRepository } from './users/repositories/users.repository';
import { PostsRepository } from './posts/repositories/posts.repository';
import { PostCommentsRepository } from './post-comments/repositories/post-comments.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Users, Posts, PostComments]),
  ],
  providers: [UsersRepository, PostsRepository, PostCommentsRepository],
  exports: [
    TypeOrmModule,
    UsersRepository,
    PostsRepository,
    PostCommentsRepository,
  ],
})
export class DataModule {}
