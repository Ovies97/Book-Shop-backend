import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Logger, Query, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('users')
export class UsersController {
    private logger = new Logger('UsersController');
  constructor(private readonly usersService: UsersService) {}


  @Get()
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Users> {
    return this.usersService.findById(id);
  }

   @Post()
   async create(@Body() createusersDto: CreateUsersDto): Promise<Users> {
     return this.usersService.create(createusersDto)
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() users: Users): Promise<Users> {
    return this.usersService.update(id, users);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }

}
