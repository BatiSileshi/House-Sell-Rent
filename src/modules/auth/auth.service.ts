import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Profiles } from '../profiles/profiles.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private profilesService: ProfilesService, 
        private jwtService: JwtService
        ){}

    async signup(phone_number: string, password: string, confirm_password: string):Promise<Profiles>{
        const users = await this.usersService.find(phone_number);
        if(users.length){
            throw new BadRequestException('Phone number already exist.')
        } else if (password !== confirm_password){
            throw new BadRequestException('Your password did not match.')
        }

        //salt generation
        const salt = randomBytes(8).toString('hex')   //16 character of salt

        // hash salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        //joining hash and salt together
        const hashed_password = salt + '.' + hash.toString('hex');

        const user = await this.usersService.create(phone_number, hashed_password)

        return user.profile;
    
    }

    async signin(phone_number, password){
        const [user] = await this.usersService.find(phone_number);
        if(!user){
            throw new NotFoundException('Account not found.')
        } else if (user.profile.is_phone_number_verified === false){
            throw new BadRequestException('Your phone is not verified.')
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')){
            throw new BadRequestException('Incorrect password.')
        }

        const accessTokenPayload = { sub: user.id, phone_number: user.phone_number};
        // const refreshTokenPayload = { sub: user.id, phone_number: user.phone_number };

        const accessToken = await this.jwtService.signAsync(accessTokenPayload);
        // const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        //     expiresIn: '7d', 
        // });

        return {
            access_token: accessToken,
        };
    }
}
