import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Features } from './features.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { HousesService } from '../houses/houses.service';
import { Houses } from '../houses/house.entity';
import { Locations } from './locations.entity';
import { CreateLocationDto } from './dtos/create-location.dto';

@Injectable()
export class FeaturesService {
    constructor(
        @InjectRepository(Features)
        private repo: Repository<Features>,
        @InjectRepository(Locations) 
        private readonly locationRepo: Repository<Locations>, 
        private housesService: HousesService
    ){}

    // create feature for house
    async create(id: number, createFeatureDto: CreateFeatureDto){

        const feature = this.repo.create(createFeatureDto);

        const featuredHouse = await this.housesService.updateFeature(id, feature);
        const createdFeature = await this.repo.save(feature);

        return createdFeature;

    }

    // get a specific feature
    async findOne(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<Features>={
            where: {id},
        };
        return await this.repo.findOne(options);
    }

    // get all features in the db
    async findAll(options?: FindManyOptions<Features>){
        const features = await this.repo.find({ ...options });

        if (!features || features.length === 0){
            throw new NotFoundException('Feature not found.')
        }
        return features;
    } 


    // update specific feature
    async update(id: number, attrs: Partial<Features>){
        const feature = await this.findOne(id);
        if(!feature){
            throw new NotFoundException("Feature not found.")
        }
        Object.assign(feature, attrs);
        return this.repo.save(feature);
    }


    // delete specific feature
    async remove(id: number){
        const feature = await this.findOne(id);
        if(!feature){
            throw new NotFoundException("Feature not found.")
        }

        return this.repo.remove(feature);
    }



//  location

     // create location for house
     async create1(id: number, createLocationDto: CreateLocationDto){

        const location = this.locationRepo.create(createLocationDto);

        const locatedHouse = await this.housesService.updateLocation(id, location);
        const createdLocation = this.locationRepo.save(location);

        return createdLocation;

    }


    // get a specific location
    async findOne1(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<Locations>={
            where: {id},
        };
        return await this.locationRepo.findOne(options);
    }

    // get all locations in the db
    async findAll1(options?: FindManyOptions<Locations>){
        const locations = await this.locationRepo.find({ ...options });

        if (!locations || locations.length === 0){
            throw new NotFoundException('Location not found.')
        }
        return locations;
    } 

    // update specific location
    async update1(id: number, attrs: Partial<Locations>){
        const location = await this.findOne1(id);
        if(!location){
            throw new NotFoundException("Location not found.")
        }
        Object.assign(location, attrs);
        return this.locationRepo.save(location);
    }


    // delete specific location
    async remove1(id: number){
        const location = await this.findOne1(id);
        if(!location){
            throw new NotFoundException("Location not found.")
        }

        return this.locationRepo.remove(location);
    }
}
 