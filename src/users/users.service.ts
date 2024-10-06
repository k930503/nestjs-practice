import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './entities/users.entity';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneById(id: number): Promise<GetUserResponseDto> {
    const user: Users = await this.usersRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return GetUserResponseDto.create(user.id, user.email, user.name, user.age);
  }

  async create(payload: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const user: Users = Object.assign(new Users(), payload);
    const exists = await this.usersRepository.existsByEmail(user.email);
    if (exists) {
      throw new ConflictException('Email is already in use');
    }
    await this.usersRepository.create(user);
    return CreateUserResponseDto.create(
      user.id,
      user.email,
      user.name,
      user.age,
    );
  }

  testUsers() {
    console.log('testUsers');
  }
}
