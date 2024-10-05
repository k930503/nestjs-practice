import { Module } from '@nestjs/common';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsService } from './post-comments.service';
import { PostsService } from '../posts/posts.service';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [],
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
  exports: [],
})
export class PostCommentsModule {}
