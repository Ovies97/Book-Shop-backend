import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(cartData: Partial<Cart>): Promise<Cart> {
    const newCart = this.cartRepository.create(cartData);
    return await this.cartRepository.save(newCart);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find();
  }

  async findbyId(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({where:{id}});
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async update(id: number, cartData: Partial<Cart>): Promise<Cart> {
    await this.findbyId(id); // Check if cart exists
    await this.cartRepository.update(id, cartData);
    return await this.findbyId(id);
  }

  async remove(id: number): Promise<void> {
    await this.findbyId(id); // Check if cart exists
    await this.cartRepository.delete(id);
  }
}
