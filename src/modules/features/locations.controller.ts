// import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { CreateLocationDto } from './dtos/create-location.dto';
// import { UpdateLocationDto } from './dtos/update-location.dto';
// import { FeaturesService } from './features.service';


// @ApiTags('locations')
// @Controller('locations')
// export class LocationsController {
//     constructor(
//         private locationsService: FeaturesService
//     ){}


//     @Post('/:id')
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Create location for house'  , description: "Create location for specific house with id: id"})
//     // @UseGuards(AuthGuard)
//     async createLocation(@Param('id') id: string, @Body() createLocationDto: CreateLocationDto){
//         const createdLocation = await this.locationsService.create1(parseInt(id), createLocationDto);

//         return createdLocation;
//     }

//     // get all locations
//     @Get('/')
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Getting all location. '})
//     async getLocations(){
//         const locations = await this.locationsService.findAll1();
//         return locations;
//     }

//     @Get('/:id/get')
//     @ApiBearerAuth()
//     @ApiOperation({ summary: 'Get specific location'})
//     // @UseGuards(AuthGuard)
//     async getLocation(@Param('id') id: string){
//         const location = await this.locationsService.findOne1(parseInt(id));
//         if(!location){
//             throw new NotFoundException('Location not found.')
//         }
//         return location; 
//     }

//     @Patch('/:id/update')
//     @ApiBearerAuth()
//     @ApiOperation({summary: "Updating location", description: "Done by house owners only"})
//     // @UseGuards(AuthGuard)
//     async updateLocation(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto){
//         const updatedLocation = await this.locationsService.update1(parseInt(id), updateLocationDto);
//         return updatedLocation;
//     }


//     @Delete(':id/delete') 
//     @ApiBearerAuth()
//     // @UseGuards(AuthGuard, HouseGuard)
//     @ApiOperation({summary: "Deleting location", description: "Only house owner can delete."})
//     async removeLocation(@Param('id') id: string){
//         return await this.locationsService.remove1(parseInt(id));
//     }

// }
