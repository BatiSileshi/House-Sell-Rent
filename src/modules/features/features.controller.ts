import { Controller, Post, Body, Param, Get, NotFoundException, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiProperty, ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { FeaturesService } from './features.service';
import { UpdateFeatureDto } from './dtos/update-feature.dto';
import { CreateLocationDto } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { HouseGuard } from 'src/guards/house.guards';


@ApiTags("features and locations")
@Controller('')
export class FeaturesController { 
    constructor(
        private featuresService: FeaturesService, 
    ){}

    @Post('features/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create feature for house'  , description: "Create feature for specific house with id: id"})
    // @UseGuards(AuthGuard, HouseGuard)
    async createFeature(@Param('id') id: string, @Body() createFeatureDto: CreateFeatureDto){
        const createdFeature = await this.featuresService.create(parseInt(id), createFeatureDto);

        return createdFeature;
    }

    // get all features
    @Get('features/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Getting all features. '})
    async getFeatures(){
        const features = await this.featuresService.findAll();
        return features;
    }

    @Get('features/:id/get')
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

    @Patch('features/:id/update')
    @ApiBearerAuth()
    @ApiOperation({summary: "Updating feature", description: "Done by house owners only"})
    // @UseGuards(AuthGuard)
    async updateFeature(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto){
        const updatedFeature = await this.featuresService.update(parseInt(id), updateFeatureDto);
        return updatedFeature;
    }


    @Delete('features/:id/delete') 
    @ApiBearerAuth()
    // @UseGuards(AuthGuard, HouseGuard)
    @ApiOperation({summary: "Deleting feature", description: "Only house owner can delete."})
    async removeFeature(@Param('id') id: string){
        return await this.featuresService.remove(parseInt(id));
    }












    @Post('locations/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create location for house'  , description: "Create location for specific house with id: id"})
    // @UseGuards(AuthGuard)
    async createLocation(@Param('id') id: string, @Body() createLocationDto: CreateLocationDto){
        const createdLocation = await this.featuresService.create1(parseInt(id), createLocationDto);

        return createdLocation;
    }


    // get all locations
    @Get('locations')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Getting all location. '})
    async getLocations(){
        const locations = await this.featuresService.findAll1();
        return locations;
    }

    @Get('locations/:id/get')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get specific location'})
    // @UseGuards(AuthGuard)
    async getLocation(@Param('id') id: string){
        const location = await this.featuresService.findOne1(parseInt(id));
        if(!location){
            throw new NotFoundException('Location not found.')
        }
        return location; 
    }

    @Patch('locations/:id/update')
    @ApiBearerAuth()
    @ApiOperation({summary: "Updating location", description: "Done by house owners only"})
    // @UseGuards(AuthGuard)
    async updateLocation(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto){
        const updatedLocation = await this.featuresService.update1(parseInt(id), updateLocationDto);
        return updatedLocation;
    }


    @Delete('locations/:id/delete') 
    @ApiBearerAuth()
    // @UseGuards(AuthGuard, HouseGuard)
    @ApiOperation({summary: "Deleting location", description: "Only house owner can delete."})
    async removeLocation(@Param('id') id: string){
        return await this.featuresService.remove1(parseInt(id));
    }


}
