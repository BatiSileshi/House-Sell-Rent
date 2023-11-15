import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profiles } from './profiles.entity';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guards';
import { HousesService } from '../houses/houses.service';
import { Houses } from '../houses/house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profiles, Users, Houses]),
],
  providers: [ProfilesService, AuthService, UsersService, JwtService, AuthGuard, HousesService],
  controllers: [ProfilesController]
})
export class ProfilesModule {}
