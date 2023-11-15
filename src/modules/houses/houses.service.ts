import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Houses } from './house.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateHouseDto } from './dtos/create-house.dto';
import { Profiles } from '../profiles/profiles.entity';

@Injectable()
export class HousesService {
    constructor(
        @InjectRepository(Houses)
        private repo: Repository<Houses>
    ){}

    //create house
    create(createHouseDto: CreateHouseDto, owner: Profiles){
        const house = this.repo.create(createHouseDto);
        house.owner = owner;
        return this.repo.save(house);
    }

    // find a single house
    async findOne(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<Houses>={
            where: {id},
            relations: ['owner', 'location'],
        };

        return await this.repo.findOne(options);
    }

    //update house
    async update(id: number, attrs: Partial<Houses>){
        const house = await this.findOne(id);
        if(!house){
            throw new NotFoundException("House not found.")
        }
        Object.assign(house, attrs);
        return this.repo.save(house);
    }

    // deleting house
    async remove(id: number){
        const house = await this.findOne(id);
        if(!house){
            throw new NotFoundException("House not found.")
        }

        return this.repo.remove(house);
    }

    // get all houses in the db
    async findAll(options?: FindManyOptions<Houses>){
        const houses = await this.repo.find({ ...options, relations: ['owner']});

        if (!houses || houses.length === 0){
            throw new NotFoundException('House not found.')
        }
        return houses;
    }

    // get user's houses
    async findHouseByUser(owner: Profiles, options?: FindManyOptions<Houses>){
        const houses = await this.repo.find({ where: {owner}, ...options, relations: ['owner']});

        if (!houses || houses.length === 0){
            throw new NotFoundException('This user does not have houses.')
        }
        return houses;
    }
}
