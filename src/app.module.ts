import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { BookEntity } from './books/entities/book.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './users/entity/user.entity';

require("dotenv").config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DB_HOST'],
      port: +process.env['DB_PORT'],
      password: process.env['DB_PASSWORD'],
      username: process.env['DB_USERNAME'],
      entities: [BookEntity, UserEntity],
      database: process.env['DB_DATABASE'],
      synchronize: true,
      logging: true,
    }),
    BooksModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
