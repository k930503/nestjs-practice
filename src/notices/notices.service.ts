import { Injectable } from '@nestjs/common';

@Injectable()
export class NoticesService {
  testNotices() {
    console.log('testNotices');
  }
}
