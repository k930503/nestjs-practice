import { IsNumber } from 'class-validator';
import { StrictBuilder } from 'builder-pattern';

export class GetUserResponseDto {
  @IsNumber()
  id: number;
  email: string;
  name: string;
  @IsNumber()
  age: number;

  static create(id: number, email: string, name: string, age: number) {
    return StrictBuilder<GetUserResponseDto>()
      .id(id)
      .email(email)
      .name(name)
      .age(age)
      .build();
  }
}
