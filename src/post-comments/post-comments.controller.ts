import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { CreatePostCommentResponseDto } from './dto/create-post-comment.response.dto';
import { CreatePostCommentRequestDto } from './dto/create-post-comment.request.dto';
import { PostComments } from './entities/post-comments.entity';

@Controller('post-comments')
export class PostCommentsController {
  constructor(private readonly postCommentsService: PostCommentsService) {}

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<PostComments> {
    return await this.postCommentsService.findOneById(id);
  }

  @Post()
  async create(
    @Body() payload: CreatePostCommentRequestDto,
  ): Promise<CreatePostCommentResponseDto> {
    return await this.postCommentsService.create(payload);
  }
}
