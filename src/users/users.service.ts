import { Injectable, Logger } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';
import { PostsService } from '../posts/posts.service';
import { PostCommentsService } from '../post-comments/post-comments.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    // private readonly postsService: PostsService,
  ) {}

  async getUser(id: number): Promise<GetUserResponseDto> {
    this.logger.log('getUser');
    const user = await this.usersRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
    // this.postsService.testPosts();
    // this.postsService.postCommentsService.testPostComments();
    return GetUserResponseDto.create(user.id, user.name, user.age);
  }

  async createUser(
    payload: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const result: InsertResult = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(payload)
      .returning(['id'])
      .execute();
    const userId: number = result.raw[0].id;
    return CreateUserResponseDto.create(userId, payload.name, payload.age);
  }

  testUsers() {
    console.log('testUsers');
  }
}
