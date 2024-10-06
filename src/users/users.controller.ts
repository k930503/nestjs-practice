import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { GetUserResponseDto } from './dto/get-user.response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async findOneById(@Param('id') id: number): Promise<GetUserResponseDto> {
    return await this.usersService.findOneById(id);
  }

  @Post()
  async create(
    @Body() payload: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.usersService.create(payload);
  }
}
