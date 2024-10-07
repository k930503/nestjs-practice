import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { CreatePostResponseDto } from './dto/create-post.response.dto';
import { GetPostResponseDto } from './dto/get-post.response.dto';
import { PostsRepository } from './repositories/posts.repository';
import { EntityManager } from 'typeorm';
import { PostCommentsService } from '../post-comments/post-comments.service';
import { Posts } from './entities/posts.entity';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postCommentsService: PostCommentsService,
    private readonly entityManager: EntityManager,
  ) {}

  async findOneById(id: number): Promise<GetPostResponseDto> {
    const post: Posts = await this.postsRepository.findOneById(id);
    if (!post) {
      throw new NotFoundException();
    }
    return GetPostResponseDto.create(post.id, post.content, post.userId);
  }

  async create(payload: CreatePostRequestDto): Promise<CreatePostResponseDto> {
    const post: Posts = Object.assign(new Posts(), payload);
    await this.postsRepository.create(post);
    return CreatePostResponseDto.create(post.id, post.content, post.userId);
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
