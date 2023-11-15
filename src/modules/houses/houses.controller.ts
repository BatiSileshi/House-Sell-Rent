import { Body, Controller, Post, UseGuards,
Get, 
Param,
Patch,
NotFoundException,
Delete} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { HousesService } from './houses.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CreateHouseDto } from './dtos/create-house.dto';
import { CurrentUser } from '../users/decorators/user.decorator';
import { ProfilesService } from '../profiles/profiles.service';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { HouseDto } from './dtos/house.dto';
import { Profiles } from '../profiles/profiles.entity';
import { UpdateHouseDto } from './dtos/update-house.dto';

@ApiTags('houses')
@Controller('houses')
export class HousesController {
    constructor (
        private housesService: HousesService, 
        private readonly profilesService: ProfilesService){}

    //create house   
    @Post('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create house'})
    @UseGuards(AuthGuard)
    @Serialize(HouseDto)
    async createHouse(@Body() createHouseDto: CreateHouseDto, @CurrentUser() user: any){
        const currentUserProfile = await this.profilesService.findOneByUserId(user.sub);

        return this.housesService.create(createHouseDto, currentUserProfile);
    }


    //getting all houses
    @Get('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Getting all houses. '})
    @Serialize(HouseDto)
    async getHouses(){
        const houses = await this.housesService.findAll();
        return houses;
    }


    // getting single house
    @Get('/:id/get')
    @ApiBearerAuth()
    @ApiOperation({summary: "Getting single house by its id"})
    @Serialize(HouseDto)
    async getSingleHouse(@Param('id') id: string){
        const house = await this.housesService.findOne(parseInt(id));
        if(!house){
            throw new NotFoundException('House not found.')
        }
        return house;
    }


    // get other owners project
    @Get('/owners/:id/get')
    @ApiBearerAuth()
    @ApiOperation({summary: "Getting user's houses by their id"})
    @Serialize(HouseDto)
    async getUserHouse(@Param('id') id: string){

        const houses = await this.housesService.findHouseByUser({id: parseInt(id)} as Profiles);

        return houses;
    }

    //updating house
    @Patch('/:id/update')
    @ApiBearerAuth()
    @ApiOperation({summary: "Updating house", description: "Only owner can update."})
    @Serialize(HouseDto)
    // @UseGuards(AuthGuard)
    async updateHouse(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto){
        const updatedHouse = await this.housesService.update(parseInt(id), updateHouseDto);
        return updatedHouse;
    }
    
    //deleting house
    @Delete(':id/delete')
    @ApiBearerAuth()
    @Serialize(HouseDto)
    @ApiOperation({summary: "Deleting house", description: "Only owner can delete."})
    async removeHouse(@Param('id') id: string){
        return await this.housesService.remove(parseInt(id));
    }

}
