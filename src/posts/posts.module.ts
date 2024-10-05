import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PostCommentsService } from '../post-comments/post-comments.service';
import { PostCommentsModule } from '../post-comments/post-comments.module';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [],
})
export class PostsModule {}
