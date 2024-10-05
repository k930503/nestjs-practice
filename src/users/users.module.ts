import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PostsService } from '../posts/posts.service';
import { PostCommentsService } from '../post-comments/post-comments.service';
import { PostsModule } from '../posts/posts.module';
import { PostCommentsModule } from '../post-comments/post-comments.module';

@Module({
  imports: [PostsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
