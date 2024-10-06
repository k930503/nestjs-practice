import { Module } from '@nestjs/common';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsService } from './post-comments.service';
import { DataModule } from '../data.module';

@Module({
  imports: [DataModule],
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
  exports: [PostCommentsService],
})
export class PostCommentsModule {}
