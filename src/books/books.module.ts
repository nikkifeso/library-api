import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/entity/user.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([
      BookEntity,
      UserEntity])
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
