import { IsNumber } from 'class-validator';

export class CreateUserRequestDto {
  name: string;
  @IsNumber()
  age: number;
}
