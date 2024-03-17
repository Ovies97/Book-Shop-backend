import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
 
 constructor(@InjectRepository(Users)private usersRepository: Repository<Users>,)
 {
    super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET,})
 }

 async validate(payload: JwtPayload): Promise<Users>
 {
    const { username} = payload;
    const users = await this.usersRepository.findOne({where: {username} });

    if(!users)
    {
        throw new UnauthorizedException();
    }

    return users;
 }
}