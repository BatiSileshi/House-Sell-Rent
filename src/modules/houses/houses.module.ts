import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Houses } from './house.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { Profiles } from '../profiles/profiles.entity';
import { Categories } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';
import { Features } from '../features/features.entity';
import { FeaturesService } from '../features/features.service';
import { Locations } from '../features/locations.entity';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([Houses, Locations, Features, Profiles, Categories]),

],
  controllers: [HousesController],
  providers: [HousesService,  FeaturesService, ProfilesService, CategoriesService
  ],
})
export class HousesModule {}
 