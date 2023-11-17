import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Features } from './features.entity';
import { Houses } from '../houses/house.entity';
import { HousesService } from '../houses/houses.service';
import { Categories } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Features, Houses, Categories]),
],
  providers: [FeaturesService, HousesService, CategoriesService],
  controllers: [FeaturesController]
})
export class FeaturesModule {}
