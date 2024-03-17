import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {

  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,private jwtService: JwtService) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Users> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(); 

    const user = new Users();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      return await this.usersRepository.save(user);
      // return this.signIn({ username, password } as AuthCredentialsDto)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exits');
      }
      else {
        console.log(error)
        throw new InternalServerErrorException();
      }
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);

  }



  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    try {

        const username = await this.validateUsersPassword(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
        
        return Users.username;

    } catch (error) {
        throw new UnauthorizedException('Invalid credentials');
    }
}



  async validateUsersPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>
  {
    const { username, password } = authCredentialsDto;
    const users = await this.usersRepository.findOne({where:{username}});

    if(users && await users.validatePassword(password))
    {

      const payload = { username: users.username };
      const accessToken = this.jwtService.sign(payload);
      return users.username;

      //GENERATE TOKEN
      /**
       *    {
       *      user: users,
       *      accessToken: 'sdfksjdhbflkdashflkhsdfks'
       *    }
       */
     //return users.username;
    }
    else
    {
     return null;
    }
  }

  

}
