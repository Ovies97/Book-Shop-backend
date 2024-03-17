import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(book: Book): Promise<Book> {
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findbyId(id: number): Promise<Book | undefined> {
    return await this.bookRepository.findOne({where:{id}});
  }

  async update(id: number, book: Book): Promise<Book> {
    await this.bookRepository.update(id, book);
    return await this.bookRepository.findOne({where:{id
    }});
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
