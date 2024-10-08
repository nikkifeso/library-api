import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import NotFoundError from 'src/exceptions/not-found.exception';


@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get('seed')
  async  seedData(): Promise<string> {
    await this.booksService.seedData();
    return 'Database seeded successfully!';
  }

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto) {
    try {
      await this.booksService.create(createBookDto)
      return {
        success: true,
        message: 'Book Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data =
        await this.booksService.findAll();
      return {
        success: true,
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.booksService.findOne(
        id,
      );
      return {
        success: true,
        data,
        message: 'Book Fetched Successfully',
      };
    } catch (error) {
     // cater to all common errors
      throw new NotFoundError('Book', id);
  
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const data = await this.booksService.update(id, updateBookDto);
      return {
        success: true,
        data,
        message: 'Book Updated Successfully',
      }
    } catch (error) {
      throw new NotFoundError('Book', id);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.booksService.remove(id);
      return {
        success: true,
        message: 'User Deleted Successfully',
      };
    } catch (error) {
      throw new NotFoundError('Book', id);
    }
  }
}
