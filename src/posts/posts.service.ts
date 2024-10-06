import { Injectable, Logger } from '@nestjs/common';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { CreatePostResponseDto } from './dto/create-post.response.dto';
import { GetPostResponseDto } from './dto/get-post.response.dto';
import { PostsRepository } from './repositories/posts.repository';
import { EntityManager } from 'typeorm';
import { PostCommentsService } from '../post-comments/post-comments.service';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postCommentsService: PostCommentsService,
    private readonly entityManager: EntityManager,
  ) {}

  async findOneById(id: number): Promise<GetPostResponseDto> {
    // const post = await this.postsRepository
    //   .createQueryBuilder()
    //   .where('id = :id', { id })
    //   .getOne();

    // this.postCommentsService.testPostComments();

    return GetPostResponseDto.create(id, '', 1);
  }

  async create(payload: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    // const result: InsertResult = await this.postsRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Posts)
    //   .values(payload)
    //   .returning(['id'])
    //   .execute();
    // const id: number = result.raw[0].id;
    return CreatePostResponseDto.create(1, payload.content, payload.userId);
  }

  async deleteById(id: number): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      await this.postsRepository.deleteById(id, manager);
      await this.postCommentsService.deleteByPostIdWithTransaction(id, manager);
    });
  }

  testPosts() {
    console.log('testPosts');
  }
}
