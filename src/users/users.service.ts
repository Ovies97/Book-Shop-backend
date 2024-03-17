import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

constructor(@InjectRepository(Users) private usersRepository: Repository<Users>,) { }


async findAll(): Promise<Users[]>{
    return await this.usersRepository.find();
}


async findById(id: number): Promise<Users>{
    return await this.usersRepository.findOne({where:{id}})
}

async create(createusersDto: CreateUsersDto): Promise<Users>{
   const { username, password} = createusersDto;

     const salt = await bcrypt.genSalt();
     const hashedPassword = await bcrypt.hash(password, salt);
     const users = new Users();

     users.username = username;
     users.salt = salt
     users.password = hashedPassword;

     return await this.usersRepository.save(users);
 }


async update(id: number, users: Users): Promise<Users>{
    await this.usersRepository.update(id, users);
    return this.findById(id);
}

async delete(id: number): Promise<void>{
    await this.usersRepository.delete(id);
}

}
