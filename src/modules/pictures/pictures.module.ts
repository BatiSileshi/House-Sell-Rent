import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pictures } from './pictures.entity';
import { Houses } from '../houses/house.entity';
import { HousesService } from '../houses/houses.service';
import { Categories } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pictures, Houses, Categories]),
],
  providers: [PicturesService, HousesService, CategoriesService],
  controllers: [PicturesController]
})
export class PicturesModule {}
