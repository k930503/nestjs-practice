import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentsService } from './post-comments.service';
import { PostCommentsRepository } from './repositories/post-comments.repository';

describe('PostCommentsService', () => {
  let service: PostCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostCommentsService,
        {
          provide: PostCommentsRepository,
          useValue: {
            findOneById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostCommentsService>(PostCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
