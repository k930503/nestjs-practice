import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { CreatePostResponseDto } from './dto/create-post.response.dto';
import { GetPostResponseDto } from './dto/get-post.response.dto';
import { UsersService } from '../users/users.service';
import { PostCommentsService } from '../post-comments/post-comments.service';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    // public readonly postCommentsService: PostCommentsService,
  ) {}

  async getPost(id: number): Promise<GetPostResponseDto> {
    this.logger.log('getPost');
    const post = await this.postsRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    // this.postCommentsService.testPostComments();

    return GetPostResponseDto.create(post.id, post.content, post.userId);
  }

  async createPost(
    payload: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const result: InsertResult = await this.postsRepository
      .createQueryBuilder()
      .insert()
      .into(Posts)
      .values(payload)
      .returning(['id'])
      .execute();
    const id: number = result.raw[0].id;
    return CreatePostResponseDto.create(id, payload.content, payload.userId);
  }

  testPosts() {
    console.log('testPosts');
  }
}
