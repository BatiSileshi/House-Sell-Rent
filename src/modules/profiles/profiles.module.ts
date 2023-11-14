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

@Module({
  imports: [TypeOrmModule.forFeature([Profiles, Users]),
],
  providers: [ProfilesService, AuthService, UsersService, JwtService, AuthGuard],
  controllers: [ProfilesController]
})
export class ProfilesModule {}
