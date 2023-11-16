import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories)
        private repo: Repository<Categories>
    ){}

    //create category
    create(createCategoryDto: CreateCategoryDto){
        const category = this.repo.create(createCategoryDto);
        return this.repo.save(category);
    }

    //get single category
    async findOne(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<Categories>={
            where: {id},
        };

        return await this.repo.findOne(options);
    }

    // get all categories
    async findAll(options?: FindManyOptions<Categories>){
        const categories = await this.repo.find({ ...options });

        if (!categories || categories.length === 0){
            throw new NotFoundException('Categories not found.')
        }
        return categories;
    }

    // update category
    async update(id: number, attrs: Partial<Categories>){
        const category = await this.findOne(id);
        if(!category){
            throw new NotFoundException("Category not found.")
        }

        Object.assign(category, attrs);
        return this.repo.save(category);
    }

    // remove category
    async remove(id: number){
        const category = await this.findOne(id);
        if(!category){
            throw new NotFoundException("Category not found.")
        }
        return this.repo.remove(category);
    }
}
