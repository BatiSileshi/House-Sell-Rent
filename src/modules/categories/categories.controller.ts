import { Controller, Post, Get, Patch, Body, Param, UseGuards, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guards';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService
    ){}

    @Post('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create category.'})
    // @UseGuards(AuthGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto){
        return this.categoriesService.create(createCategoryDto);
    }


    @Get('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get categories.'})
    @UseGuards(AuthGuard)
    async getCategories(){
        return await this.categoriesService.findAll()
    }

    @Get(':id/get')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get single category.'})
    @UseGuards(AuthGuard)
    async getCategory(@Param('id') id:string){
        const category = await this.categoriesService.findOne(parseInt(id));
        if(!category){
            throw new NotFoundException("Category not found.")
        }
        return category;
    }

    @Patch(':id/update')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update single category.'})
    @UseGuards(AuthGuard)
    async updateCategory(@Param('id') id:string, @Body() updateCategoryDto: UpdateCategoryDto){
        return await this.categoriesService.update(parseInt(id), updateCategoryDto);
    }


    @Delete(':id/delete')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete category.'})
    @UseGuards(AuthGuard)
    async removeCategory(@Param('id') id:string){
        return await this.categoriesService.remove(parseInt(id));
    }

}
