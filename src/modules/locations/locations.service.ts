import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Locations } from './locations.entity';
import { HousesService } from '../houses/houses.service';
import { CreateLocationDto } from './dtos/create-location.dto';

@Injectable() 
export class LocationsService {
    constructor(
        private readonly repo: Repository<Locations>, 
        private readonly housesService: HousesService
    ){}

    // create location for house
    async create(id: number, createLocationDto: CreateLocationDto){

        const location = this.repo.create(createLocationDto);

        const locatedHouse = await this.housesService.updateLocation(id, location);
        const createdLocation = this.repo.save(location);

        return createdLocation;

    }

    // get a specific location
    async findOne(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<Locations>={
            where: {id},
        };
        return await this.repo.findOne(options);
    }

    // get all locations in the db
    async findAll(options?: FindManyOptions<Locations>){
        const locations = await this.repo.find({ ...options });

        if (!locations || locations.length === 0){
            throw new NotFoundException('Location not found.')
        }
        return locations;
    } 


    // update specific location
    async update(id: number, attrs: Partial<Locations>){
        const location = await this.findOne(id);
        if(!location){
            throw new NotFoundException("Location not found.")
        }
        Object.assign(location, attrs);
        return this.repo.save(location);
    }


    // delete specific location
    async remove(id: number){
        const location = await this.findOne(id);
        if(!location){
            throw new NotFoundException("Location not found.")
        }

        return this.repo.remove(location);
    }
}
 
