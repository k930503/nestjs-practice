import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, InsertResult } from 'typeorm';
import { PostComments } from './entities/post-comments.entity';
import { GetPostCommentResponseDto } from './dto/get-post-comment.response.dto';
import { CreatePostCommentRequestDto } from './dto/create-post-comment.request.dto';
import { CreatePostCommentResponseDto } from './dto/create-post-comment.response.dto';
import { PostCommentsRepository } from './repositories/post-comments.repository';

@Injectable()
export class PostCommentsService {
  private readonly logger = new Logger(PostCommentsService.name);
  constructor(
    private readonly postCommentsRepository: PostCommentsRepository,
    // private readonly postsService: PostsService,
    // private readonly usersService: UsersService,
  ) {}

  async getPostComment(id: number): Promise<GetPostCommentResponseDto> {
    // this.logger.log('getPostComment');
    // const postComment = await this.postCommentsRepository
    //   .createQueryBuilder()
    //   .where('id = :id', { id })
    //   .getOne();

    // this.postsService.testPosts();
    // this.usersService.testUsers();

    return null;
  }

  async createPostComment(
    payload: CreatePostCommentRequestDto,
  ): Promise<CreatePostCommentResponseDto> {
    // const result: InsertResult = await this.postCommentsRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(PostComments)
    //   .values(payload)
    //   .returning(['id'])
    //   .execute();
    // const id: number = result.raw[0].id;
    // return CreatePostCommentResponseDto.create(
    //   id,
    //   payload.content,
    //   payload.parentId,
    //   payload.userId,
    //   payload.postId,
    // );
    return null;
  }

  async deleteById(id: number): Promise<void> {
    await this.postCommentsRepository.deleteById(id);
  }

  async deleteByPostIdWithTransaction(
    id: number,
    manager: EntityManager,
  ): Promise<void> {
    await this.postCommentsRepository.deleteById(id, manager);
  }

  testPostComments() {
    console.log('testComments');
  }
}
