import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { PostComments } from '../entities/post-comments.entity';
import { Posts } from '../../posts/entities/posts.entity';

@Injectable()
export class PostCommentsRepository {
  constructor(
    @InjectRepository(PostComments)
    private readonly postCommentsRepository: Repository<PostComments>,
  ) {}

  async findOneById(id: number): Promise<PostComments> {
    try {
      const postComment: PostComments = await this.postCommentsRepository
        .createQueryBuilder()
        .where('id = :id', { id })
        .getOne();
      if (!postComment) {
        return null;
      }
      return postComment;
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

  async create(postComment: PostComments): Promise<void> {
    try {
      await this.postCommentsRepository
        .createQueryBuilder()
        .insert()
        .into(PostComments)
        .values(postComment)
        .execute();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }

  async deleteById(id: number, manager?: EntityManager): Promise<void> {
    const repo = manager ? manager : this.postCommentsRepository;
    try {
      await repo
        .createQueryBuilder()
        .delete()
        .from(PostComments)
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        Logger.error(`Database query failed: ${error.message}`, error.stack);
      }
      throw error;
    }
  }
}
