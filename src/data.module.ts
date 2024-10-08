import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity';
import { Posts } from './entities/posts.entity';
import { PostComments } from './entities/post-comments.entity';
import { UsersRepository } from './users/repositories/users.repository';

@Global()
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
  providers: [UsersRepository],
  exports: [TypeOrmModule, UsersRepository],
})
export class DataModule {}
