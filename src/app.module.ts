import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataModule } from './data.module';
import { PostsModule } from './posts/posts.module';
import { PostCommentsModule } from './post-comments/post-comments.module';
import { NoticesModule } from './notices/notices.module';

@Module({
  imports: [DataModule, UsersModule, PostsModule, PostCommentsModule, NoticesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
