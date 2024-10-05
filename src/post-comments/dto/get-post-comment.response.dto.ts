import { IsNumber } from 'class-validator';
import { StrictBuilder } from 'builder-pattern';

export class GetPostCommentResponseDto {
  @IsNumber()
  id: number;
  content: string;
  @IsNumber()
  parentId: number;
  @IsNumber()
  userId: number;
  @IsNumber()
  postId: number;

  static create(
    id: number,
    content: string,
    parentId: number,
    userId: number,
    postId: number,
  ) {
    return StrictBuilder<GetPostCommentResponseDto>()
      .id(id)
      .content(content)
      .parentId(parentId)
      .userId(userId)
      .postId(postId)
      .build();
  }
}
