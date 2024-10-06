import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findOneById(id: number): Promise<Users> {
    try {
      const user: Users = await this.usersRepository
        .createQueryBuilder()
        .where('id = :id', { id })
        .getOne();
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      return await this.usersRepository.exists({ where: { email } });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async create(user: Users): Promise<void> {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values(user)
        .execute();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }
}
