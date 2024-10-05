import { IsNumber } from 'class-validator';

export class CreatePostRequestDto {
  content: string;
  @IsNumber()
  userId: number;
}
