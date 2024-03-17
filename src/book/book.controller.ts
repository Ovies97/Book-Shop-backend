import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async findbyId(@Param('id') id: string): Promise<Book | undefined> {
    return await this.bookService.findbyId(+id);
  }


  @Post()
  async create(@Body() book: Book): Promise<Book> {
    return await this.bookService.create(book);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return await this.bookService.update(+id, book);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookService.delete(+id);
  }
}
