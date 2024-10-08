import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLibrary(): string {
    return 'Welcome to my Library!';
  }
}
