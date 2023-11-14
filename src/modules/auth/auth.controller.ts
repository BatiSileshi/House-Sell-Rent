import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService 
        ){}

    @Post('/register')
    async registerUser(@Body() body: CreateUserDto){
        const user = await this.authService.signup(body.phone_number, body.password, body.confirm_password);
        return user;
    }

    @Post('/login')
    async loginUser(@Body() body: LoginUserDto){
        const user = await this.authService.signin(body.phone_number, body.password);

        return user;
    }

}
