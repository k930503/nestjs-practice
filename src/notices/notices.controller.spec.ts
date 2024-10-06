import { Test, TestingModule } from '@nestjs/testing';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

describe('NoticesController', () => {
  let controller: NoticesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticesController],
      providers: [
        {
          provide: NoticesService,
          useValue: {
            // 서비스의 메서드를 목(mock)으로 처리할 수 있습니다.
          },
        },
      ],
    }).compile();

    controller = module.get<NoticesController>(NoticesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
