import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethods } from './methods.entity';
import { Payments } from './payments.entity';
import { PaymentMethodsService } from './methods.service';
import { PaymentMethodsController } from './methods.controller';
import { Houses } from '../houses/house.entity';
import { HousesService } from '../houses/houses.service';
import { Categories } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentMethods, Payments, Houses, Categories]),
  ],
  providers: [PaymentsService, PaymentMethodsService, HousesService, CategoriesService],
  controllers: [PaymentsController, PaymentMethodsController]
})
export class PaymentsModule {}
