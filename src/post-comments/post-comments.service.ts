import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
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
  ) {}

  async findOneById(id: number): Promise<GetPostCommentResponseDto> {
    const postComment: PostComments =
      await this.postCommentsRepository.findOneById(id);
    if (!postComment) {
      throw new NotFoundException();
    }
    return GetPostCommentResponseDto.create(
      postComment.id,
      postComment.content,
      postComment.parentId,
      postComment.userId,
      postComment.postId,
    );
  }

  async create(
    payload: CreatePostCommentRequestDto,
  ): Promise<CreatePostCommentResponseDto> {
    const postComment: PostComments = Object.assign(
      new PostComments(),
      payload,
    );
    await this.postCommentsRepository.create(postComment);
    return CreatePostCommentResponseDto.create(
      postComment.id,
      postComment.content,
      postComment.parentId,
      postComment.userId,
      postComment.postId,
    );
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
