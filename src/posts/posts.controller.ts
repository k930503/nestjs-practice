import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequestDto } from './dto/create-post.request.dto';
import { CreatePostResponseDto } from './dto/create-post.response.dto';
import { Posts } from './entities/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<Posts> {
    return await this.postsService.findOneById(id);
  }

  @Post()
  async create(
    @Body() payload: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    return await this.postsService.create(payload);
  }

  @Delete()
  async deleteById(@Param('id') id: number): Promise<void> {}
}
