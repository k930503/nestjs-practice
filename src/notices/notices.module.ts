import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { DataModule } from '../data.module';

@Module({
  imports: [DataModule],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
