import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findOneById: jest.fn(),
            create: jest.fn(),
            existsByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('유저 정상 조회', async () => {
      const mockUser: Users = {
        id: 1,
        email: 'test@test.com',
        name: 'testuser',
        age: 30,
      };
      jest.spyOn(usersRepository, 'findOneById').mockResolvedValue(mockUser);
      const result = await service.findOneById(1);
      expect(result).toEqual(mockUser);
    });

    it('유저 조회되지 않을 시 not found exception', async () => {
      jest.spyOn(usersRepository, 'findOneById').mockResolvedValue(null);
      try {
        await service.findOneById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create', () => {
    it('유저 정상 생성', async () => {
      const mockUser: CreateUserRequestDto = {
        email: 'test@test.com',
        name: 'testuser',
        age: 30,
      };
      jest.spyOn(usersRepository, 'existsByEmail').mockResolvedValue(false);
      jest
        .spyOn(usersRepository, 'create')
        .mockImplementation((user: Users) => {
          user.id = 1; // TypeORM이 자동으로 id를 추가하는 동작을 흉내냅니다.
          return Promise.resolve();
        });

      const result = await service.create(mockUser);
      expect(result).toEqual(
        CreateUserResponseDto.create(
          1, // mock에서 추가된 id
          mockUser.email,
          mockUser.name,
          mockUser.age,
        ),
      );
    });
  });
});
