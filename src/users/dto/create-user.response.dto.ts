import { IsNumber } from 'class-validator';
import { StrictBuilder } from 'builder-pattern';

export class CreateUserResponseDto {
  @IsNumber()
  id: number;
  name: string;
  email: string;
  @IsNumber()
  age: number;

  static create(id: number, email: string, name: string, age: number) {
    return StrictBuilder<CreateUserResponseDto>()
      .id(id)
      .email(email)
      .name(name)
      .age(age)
      .build();
  }
}
