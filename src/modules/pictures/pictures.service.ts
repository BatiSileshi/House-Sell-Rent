import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pictures } from './pictures.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreatePictureDto } from './dtos/create-picture.dto';
import { HousesService } from '../houses/houses.service';


@Injectable()
export class PicturesService {
    constructor(
        @InjectRepository(Pictures)
        private repo: Repository<Pictures>,
        private housesService: HousesService
    ){}

    async create(id: number, createPictureDto: CreatePictureDto){
        const house =  await this.housesService.findOne(id);

        if(!house){
            throw new NotFoundException("Non existing house.")
        }
        const picture = this.repo.create(createPictureDto);
        picture.house = house;

        const createdPicture = await this.repo.save(picture);
        console.log(createdPicture)
        return createdPicture;
    }

    // get single picture
    async findOne(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<Pictures>={
            where: {id},
            relations: ['house'], 
        };
        const picture = await this.repo.findOne(options);
    
        return picture;
    }

    //get all pictures in the db
    async findAll(options?: FindManyOptions<Pictures>){
        const pictures = await this.repo.find({ ...options , relations:['house']});

        if (!pictures || pictures.length === 0){
            throw new NotFoundException('Picture not found.')
        }
        return pictures;
    } 


    // get pictures of specific hotel by id
    async findPicturesByHouse(id: number){
        const house = await this.housesService.findOne(id);
        if(!house){
            throw new NotFoundException("Non existing house.")
        }

        const options: FindManyOptions<Pictures>={
            where: { house: { id: id } },
            relations: ['house'], 

        }
        const foundPictures = await this.repo.find(options);

        return foundPictures;
    }


    // update picture
    async update(id: number, attrs: Partial<Pictures>){
        const picture = await this.findOne(id);
        if(!picture){
            throw new NotFoundException("Picture not found.")
        }
        Object.assign(picture, attrs);
        return this.repo.save(picture);
    }


    // delete picture
    async remove(id: number){
        const picture = await this.findOne(id);
        if(!picture){
            throw new NotFoundException("Picture not found.")
        }

        return this.repo.remove(picture);
    }
}
