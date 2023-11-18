import { Injectable, Post, Get, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payments } from './payments.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payments)
        private repo: Repository<Payments>
    ){}

    //create payment and send request to chapa
    create(createPaymentDto: CreatePaymentDto){
        const payment= this.repo.create(createPaymentDto);
        console.log("Created Payment: ", payment);

        return payment;
    }

}
