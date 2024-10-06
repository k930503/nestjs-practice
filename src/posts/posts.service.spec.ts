import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostsRepository } from './repositories/posts.repository';
import { PostCommentsService } from '../post-comments/post-comments.service';
import { EntityManager } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let postsRepository: PostsRepository;
  let postCommentsService: PostCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: EntityManager,
          useValue: {
            transaction: jest.fn().mockImplementation((cb) => {
              const manager = {};
              return cb(manager);
            }), // 트랜잭션 자체 모킹
          },
        },
        {
          provide: PostsRepository,
          useValue: {
            findOneById: jest.fn(),
            create: jest.fn(),
            deleteById: jest.fn(),
          },
        },
        {
          provide: PostCommentsService,
          useValue: {
            findOneById: jest.fn(),
            create: jest.fn(),
            deleteByPostIdWithTransaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postCommentsService = module.get<PostCommentsService>(PostCommentsService);
    postsRepository = module.get<PostsRepository>(PostsRepository);
  });

  describe('deleteById', () => {
    it('유저 삭제 성공', async () => {
      jest.spyOn(postsRepository, 'deleteById').mockResolvedValue(undefined);
      jest
        .spyOn(postCommentsService, 'deleteByPostIdWithTransaction')
        .mockResolvedValue(undefined);
      await service.deleteById(1);
      expect(postsRepository.deleteById).toHaveBeenCalledWith(
        1,
        expect.anything(),
      ); // postRepository가 올바른 인자로 호출되었는지 확인
      expect(
        postCommentsService.deleteByPostIdWithTransaction,
      ).toHaveBeenCalledWith(1, expect.anything()); // postCommentsService가 호출되었는지 확인
    });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
