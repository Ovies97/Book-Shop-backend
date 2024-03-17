import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig), AuthModule, UsersModule, BookModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
