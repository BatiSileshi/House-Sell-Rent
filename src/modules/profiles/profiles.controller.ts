import { Controller, Request, 
    UseGuards, Get, Patch, Body } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { ApiOperation } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CurrentUser } from '../users/decorators/user.decorator';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@ApiTags('users')
@Controller('users')
export class ProfilesController {
    constructor( 
        private usersService: UsersService, 
        private profilesService: ProfilesService
        ){}

    @Get('/profile')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get currently logged in user profile'})
    getProfile(@Request() req){
        //req.user.sub === current user id
        return this.profilesService.findOneByUserId(req.user.sub)
    } 

    @Patch('/profile/update')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update profile'})
    async updateProfile(@CurrentUser() user:any, @Body() updateProfileDto: UpdateProfileDto){
        const currentUserId=user.sub;

        const updatedProfile= await this.profilesService.update(currentUserId, updateProfileDto);
        return updatedProfile;
    }
  


}
