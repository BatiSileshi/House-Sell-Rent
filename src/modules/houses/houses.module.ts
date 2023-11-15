import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Houses } from './house.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { Profiles } from '../profiles/profiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Houses, Profiles]),
],
  controllers: [HousesController],
  providers: [HousesService, ProfilesService]
})
export class HousesModule {}
 