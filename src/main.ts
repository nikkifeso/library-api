import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BooksService } from './books/books.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );
  const books = app.get(BooksService);
  await books.seedData();
  await app.listen(3001);
}
bootstrap();
