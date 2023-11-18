import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Features } from './features.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { HousesService } from '../houses/houses.service';
import { Houses } from '../houses/house.entity';

@Injectable()
export class FeaturesService {
    constructor(
        @InjectRepository(Features)
        private repo: Repository<Features>, 
        private housesService: HousesService
    ){}

    // create feature for house
    async create(id: number, createFeatureDto: CreateFeatureDto){

        const feature = this.repo.create(createFeatureDto);

        const featuredHouse = await this.housesService.updateFeature(id, feature);
        const createdFeature = this.repo.save(feature);

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
}
 