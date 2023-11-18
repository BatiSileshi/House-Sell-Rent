import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './locations.entity';
import { HousesService } from '../houses/houses.service';
import { Houses } from '../houses/house.entity';
import { Features } from '../features/features.entity';
import { FeaturesService } from '../features/features.service';
import { Categories } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';
import { Profiles } from '../profiles/profiles.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { LocationsService } from './locations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Locations, Houses,  Categories, Profiles]),

],
  providers: [ LocationsService,  HousesService,  CategoriesService, ProfilesService],
  controllers: [LocationsController]
})
export class LocationsModule {}
