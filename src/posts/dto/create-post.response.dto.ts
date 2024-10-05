import { IsNumber } from 'class-validator';
import { StrictBuilder } from 'builder-pattern';

export class CreatePostResponseDto {
  @IsNumber()
  id: number;
  content: string;
  @IsNumber()
  userId: number;

  static create(id: number, content: string, userId: number) {
    return StrictBuilder<CreatePostResponseDto>()
      .id(id)
      .content(content)
      .userId(userId)
      .build();
  }
}
