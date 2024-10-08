import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) { }
  
  //Separate into helper function
  async seedData(): Promise<void> {
    const postData: Partial<BookEntity>[] = [
      { title: 'The trials of Jimmy', author: 'Jimi Disu', year_published: 1996 },
      { title: "Sade's secret", author: 'John Okoro', year_published:  2000},
      { title: 'An American Marriage', author: 'Tayana Burke', year_published: 2021 },
    ];

    try {
      await this.bookRepository.save(postData);
      Logger.log('Data seeded successfully');
    } catch (error) {
      Logger.error(`Error seeding data: ${error.message}`, error.stack);
    }
  }

  async create(
    CreateBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    const bookData = await this.bookRepository.create(CreateBookDto);
    return this.bookRepository.save(bookData);
  }

  async findAll(): Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  // Try and throw all errors
  async findOne(id: string): Promise<BookEntity> {
    const bookData = await this.bookRepository.findOneBy({ id });
    if (!bookData) {
      throw new HttpException(
        'Book Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    return bookData;
  }

  async update(
    id: string,
    UpdateBookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    const existingUser = await this.findOne(id);
    const bookData = this.bookRepository.merge(
      existingUser,
      UpdateBookDto,
    );
    return await this.bookRepository.save(
      bookData,
    );
  }

  async remove(id: string): Promise<BookEntity> {
    const existingUser = await this.findOne(id);
    return await this.bookRepository.remove(
      existingUser,
    );
  }
}
