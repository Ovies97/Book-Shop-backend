import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUsers } from './get-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/users/users.entity';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService){}
 
  
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<Users>
    {
      return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>
    {
       return this.authService.signIn(authCredentialsDto);
       
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUsers() users: Users)
    {
        console.log(users);
    }

}