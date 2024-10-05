import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { PostComments } from '../entities/post-comments.entity';
import { GetPostCommentResponseDto } from './dto/get-post-comment.response.dto';
import { CreatePostCommentRequestDto } from './dto/create-post-comment.request.dto';
import { CreatePostCommentResponseDto } from './dto/create-post-comment.response.dto';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { Posts } from '../entities/posts.entity';

@Injectable()
export class PostCommentsService {
  private readonly logger = new Logger(PostCommentsService.name);
  constructor(
    @InjectRepository(PostComments)
    private readonly postCommentsRepository: Repository<PostComments>,
    // private readonly postsService: PostsService,
    // private readonly usersService: UsersService,
  ) {}

  async getPostComment(id: number): Promise<GetPostCommentResponseDto> {
    this.logger.log('getPostComment');
    const postComment = await this.postCommentsRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    // this.postsService.testPosts();
    // this.usersService.testUsers();

    return GetPostCommentResponseDto.create(
      postComment.id,
      postComment.content,
      postComment.parentId,
      postComment.userId,
      postComment.postId,
    );
  }

  async createPostComment(
    payload: CreatePostCommentRequestDto,
  ): Promise<CreatePostCommentResponseDto> {
    const result: InsertResult = await this.postCommentsRepository
      .createQueryBuilder()
      .insert()
      .into(PostComments)
      .values(payload)
      .returning(['id'])
      .execute();
    const id: number = result.raw[0].id;
    return CreatePostCommentResponseDto.create(
      id,
      payload.content,
      payload.parentId,
      payload.userId,
      payload.postId,
    );
  }

  testPostComments() {
    console.log('testComments');
  }
}
