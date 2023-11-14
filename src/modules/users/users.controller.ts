import { Controller, Post, Patch, Get, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guards';
import { Profiles } from '../profiles/profiles.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ProfilesService } from '../profiles/profiles.service';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly profilesService: ProfilesService,
        ){}

    @Patch('/update-phone_number')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update phone number'})
    @UseGuards(AuthGuard)
    async updateCurrentUserPhoneNumber(@CurrentUser() user: any, @Body() updateUserDto: UpdateUserDto
    ): Promise<Profiles>{

        const currentUserId= user.sub;

        await this.usersService.update(currentUserId, updateUserDto);
        const updatedProfile = await this.profilesService.updatePhoneNumber(currentUserId, updateUserDto);

        return updatedProfile;
    }

}
