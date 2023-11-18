import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethods } from './methods.entity';
import { Payments } from './payments.entity';
import { PaymentMethodsService } from './methods.service';
import { PaymentMethodsController } from './methods.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentMethods, Payments]),
  ],
  providers: [PaymentsService, PaymentMethodsService],
  controllers: [PaymentsController, PaymentMethodsController]
})
export class PaymentsModule {}
