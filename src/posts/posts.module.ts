import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DataModule } from '../data.module';
import { PostCommentsModule } from '../post-comments/post-comments.module';

@Module({
  imports: [DataModule, PostCommentsModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [],
})
export class PostsModule {}
