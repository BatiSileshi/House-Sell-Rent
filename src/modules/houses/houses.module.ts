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
import { Pictures } from '../pictures/pictures.entity';
import { PicturesService } from '../pictures/pictures.service';
import { PaymentMethods } from '../payments/methods.entity';
import { Payments } from '../payments/payments.entity';
import { PaymentMethodsService } from '../payments/methods.service';
import { PaymentsService } from '../payments/payments.service';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([Houses, Locations, Features, Profiles, Categories, Pictures, PaymentMethods, Payments]),

],
  controllers: [HousesController],
  providers: [HousesService,  FeaturesService, ProfilesService, CategoriesService, PicturesService, PaymentMethodsService, PaymentsService
  ],
})
export class HousesModule {}
 