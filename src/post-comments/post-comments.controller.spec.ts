import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsService } from './post-comments.service';

describe('PostCommentsController', () => {
  let controller: PostCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostCommentsController],
      providers: [
        {
          provide: PostCommentsService,
          useValue: {
            // 서비스의 메서드를 목(mock)으로 처리할 수 있습니다.
          },
        },
      ],
    }).compile();

    controller = module.get<PostCommentsController>(PostCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
