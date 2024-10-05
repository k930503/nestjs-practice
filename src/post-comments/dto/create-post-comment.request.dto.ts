import { IsNumber } from 'class-validator';

export class CreatePostCommentRequestDto {
  content: string;
  @IsNumber()
  parentId: number;
  @IsNumber()
  userId: number;
  @IsNumber()
  postId: number;
}
