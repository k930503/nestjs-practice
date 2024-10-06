import { IsNumber } from 'class-validator';

export class CreateUserRequestDto {
  email: string;
  name: string;
  @IsNumber()
  age: number;
}
