// cart.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  findbyId(@Param('id') id: string): Promise<Cart> {
    return this.cartService.findbyId(+id);
  }

  @Post()
  create(@Body() cartData: Partial<Cart>): Promise<Cart> {
    return this.cartService.create(cartData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() cartData: Partial<Cart>): Promise<Cart> {
    return this.cartService.update(+id, cartData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cartService.remove(+id);
  }
}
