import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePictureDto } from './dtos/create-picture.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { Serialize } from 'src/interceptors/serializer.interceptor';
import { PictureDto } from './dtos/picture.dto';
import { UpdatePictureDto } from './dtos/update-picture.dto';

@ApiTags('pictures')
@Controller('pictures')
export class PicturesController {
    constructor(
        private picturesService: PicturesService
    ){}

    // create picture
    @Post('/:houseId')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add picture for house'  , description: "Add picture for specific house with houseId"})
    // @UseGuards(AuthGuard)
    @Serialize(PictureDto)
    async createPicture(@Param('houseId') houseId: string, @Body() createPictureDto: CreatePictureDto){
        const createdPicture = await this.picturesService.create(parseInt(houseId), createPictureDto);

        return createdPicture;
    }

    // get all pictures
    @Get('/')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Getting all pictures. '})
    @Serialize(PictureDto)
    async getPictures(){
        return await this.picturesService.findAll();
    }

    // get single picture
    @Get('/:id/get')
    @ApiBearerAuth()
    @ApiOperation({summary: "Getting single picture by its id"})
    @Serialize(PictureDto)
    async getPicture(@Param('id') id: string){
        const picture = await this.picturesService.findOne(parseInt(id));
        if(!picture){
            throw new NotFoundException('Picture not found.')
        }
        return picture;
    }

    // git pictures by hotel
    @Get('/houses/:id/get')
    @ApiBearerAuth()
    @ApiOperation({summary: "Getting pictures of specific house"})
    @Serialize(PictureDto)
    async getHousePictures(@Param('id') id: string){
        const pictures = await this.picturesService.findPicturesByHouse(parseInt(id));

        if(!pictures || pictures.length === 0){
            throw new NotFoundException("This house has no picture.")
        }
        return pictures;
    }

    // update picture
    @Patch('/:id/update')
    @ApiBearerAuth()
    @ApiOperation({summary: "Updating picture", description: "Only owner can update."})
    @Serialize(PictureDto)
    // @UseGuards(AuthGuard)
    async updatePicture(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto){
        const updatedPicture = await this.picturesService.update(parseInt(id), updatePictureDto);
        return updatedPicture;
    }

    // delete picture
    @Delete(':id/delete') 
    @ApiBearerAuth()
    @Serialize(PictureDto)
    // @UseGuards(AuthGuard, HouseGuard)
    @ApiOperation({summary: "Deleting picture", description: "Only owner can delete."})
    async removePicture(@Param('id') id: string){
        return await this.picturesService.remove(parseInt(id));
    }
}
