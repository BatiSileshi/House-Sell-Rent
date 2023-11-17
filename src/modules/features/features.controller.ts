import { Controller, Post, Body, Param, Get, NotFoundException, Patch, Delete } from '@nestjs/common';
import { ApiProperty, ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { FeaturesService } from './features.service';
import { UpdateFeatureDto } from './dtos/update-feature.dto';

@ApiTags("features")
@Controller('features')
export class FeaturesController {
    constructor(
        private featuresService: FeaturesService
    ){}

    @Post('/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create feature for house'  , description: "Create feature for specific house with id: id"})
    // @UseGuards(AuthGuard)
    async createFeature(@Param('id') id: string, @Body() createFeatureDto: CreateFeatureDto){
        const createdFeature = await this.featuresService.create(parseInt(id), createFeatureDto);

        return createdFeature;
    }

    // get all features
    @Get('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Getting all features. '})
    async getFeatures(){
        const features = await this.featuresService.findAll();
        return features;
    }

    @Get('/:id/get')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get specific feature'})
    // @UseGuards(AuthGuard)
    async getFeature(@Param('id') id: string){
        const feature = await this.featuresService.findOne(parseInt(id));
        if(!feature){
            throw new NotFoundException('Feature not found.')
        }
        return feature; 
    }

    @Patch('/:id/update')
    @ApiBearerAuth()
    @ApiOperation({summary: "Updating feature", description: "Done by house owners only"})
    // @UseGuards(AuthGuard)
    async updateFeature(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto){
        const updatedFeature = await this.featuresService.update(parseInt(id), updateFeatureDto);
        return updatedFeature;
    }


    @Delete(':id/delete') 
    @ApiBearerAuth()
    // @UseGuards(AuthGuard, HouseGuard)
    @ApiOperation({summary: "Deleting feature", description: "Only house owner can delete."})
    async removeFeature(@Param('id') id: string){
        return await this.featuresService.remove(parseInt(id));
    }

}
