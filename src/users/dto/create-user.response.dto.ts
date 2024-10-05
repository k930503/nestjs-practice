import { IsNumber } from 'class-validator';
import { StrictBuilder } from 'builder-pattern';

export class CreateUserResponseDto {
  @IsNumber()
  id: number;
  name: string;
  @IsNumber()
  age: number;

  static create(id: number, name: string, age: number) {
    return StrictBuilder<CreateUserResponseDto>()
      .id(id)
      .name(name)
      .age(age)
      .build();
  }
}
