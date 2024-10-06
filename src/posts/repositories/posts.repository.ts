import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { Posts } from '../entities/posts.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async findOneById(id: number): Promise<Posts> {
    try {
      const post: Posts = await this.postsRepository
        .createQueryBuilder()
        .where('id = :id', { id })
        .getOne();
      if (!post) {
        return null;
      }
      return post;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  // async existsByEmail(email: string): Promise<boolean> {
  //   try {
  //     return await this.postsRepository.exists({ where: { email } });
  //   } catch (error) {
  //     if (error instanceof QueryFailedError) {
  //       Logger.error(`Database query failed: ${error.message}`, error.stack);
  //     }
  //     throw error;
  //   }
  // }

  async create(post: Posts): Promise<void> {
    try {
      await this.postsRepository
        .createQueryBuilder()
        .insert()
        .into(Posts)
        .values(post)
        .execute();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async deleteById(id: number, manager?: EntityManager): Promise<void> {
    const repo = manager ? manager : this.postsRepository;
    try {
      await repo
        .createQueryBuilder()
        .delete()
        .from(Posts) // 삭제할 테이블을 지정
        .where('id = :id', { id }) // 삭제할 조건
        .execute();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }
}
