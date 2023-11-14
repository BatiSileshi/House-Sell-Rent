import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Profiles } from '../profiles/profiles.entity';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private repo: Repository<Users>,
        private profilesService: ProfilesService,

    ){}
  
    async create(phone_number, password){

        // user.created_at = new Date();
        const profile = await this.profilesService.create({
            phone_number,
            name: '',
            email: '',
            phone_number2: '',
            avatar: '',
        });

        const user = this.repo.create({ phone_number, password, profile:profile})
        // console.log(user.profile.id)
        const createdUser = this.repo.save(user);
        return createdUser;
    }

    // find user by phone_number
    find(phone_number: string){
        return this.repo.find({ where: {phone_number}, relations: ['profile']  });
    }

    findOne(id: number){
        if (!id){
            return null;
        }
        const user: FindOneOptions<Users>={
            where: {id},
            relations: ['profile']
        };
        return this.repo.findOne(user);
    }


    async update(id: number, updateUserDto: UpdateUserDto): Promise<Users>{
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('User not found.');
        }

        Object.assign(user, updateUserDto);

        const updatedUser = await this.repo.save(user);
        return updatedUser;
    }
}
