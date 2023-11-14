import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { Profiles } from '../profiles/profiles.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guards';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Profiles]),
],
  controllers: [UsersController],
  providers: [UsersService, AuthService, ProfilesService, JwtService, AuthGuard]
})
export class UsersModule {}
