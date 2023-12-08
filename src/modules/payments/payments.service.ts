import { Injectable, Post, Get, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payments } from './payments.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { HousesService } from '../houses/houses.service';
import { PaymentMethodsService } from './methods.service';
import axios from 'axios';
import { UpdatePaymentStatusDto } from './dtos/update-payment-satus.dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payments)
        private repo: Repository<Payments>, 
        private housesService: HousesService,
        private paymentMethodServices: PaymentMethodsService,
    ){}

    //create payment for specific house and send request to chapa
    async create(id: number, createPaymentDto: CreatePaymentDto){
        const house = await this.housesService.findOne(id);
        if(!house){
            throw new NotFoundException("Non existing house.")
        }

        const {payment_method, ...paymentData}= createPaymentDto;
        const selectedPaymentMethod = await this.paymentMethodServices.findOne(payment_method);
        if (!selectedPaymentMethod){
            throw new NotFoundException('Payment method not found.')
        }


        const payment= this.repo.create({
            ...paymentData,
            payment_method: selectedPaymentMethod,
        });

        payment.house = house;

        const savedPayment = await this.repo.save(payment);

        //sending request to chapa
        if(payment.payment_method.payment_method_identifier === "1"){
            const headers = {
                'Authorization': 'Bearer CHASECK_TEST-kdLyaIRGQkug9UjBlIvBFjgoDnja2vIl',
                'Content-Type': 'application/json',
            };
    
            const data = {
                "amount": payment.amount,
                "currency": "ETB",
                "email": payment.email,
                "first_name": payment.first_name,
                "last_name": payment.last_name,
                "phone_number": payment.phone_number,
                "tx_ref": payment.tx_ref,
                "callback_url": "http://127.0.0.1:3000/api/payments/webhook",
                "return_url": "https://www.google.com/",
                "customization": {
                  "title": "Pay for HRS",
                  "description": "Now your house will be shown",
                }
            };
            try {
                const response = await axios.post("https://api.chapa.co/v1/transaction/initialize", data, { headers });
                
                return response.data; 
              } catch (error) {
                // console.error('Error:', error.response.data);
                return (error.response.data);
              }
        }

        return 'Another payment method - rather than chapa';
    }


    // get single payment
    async findOne(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<Payments>={
            where: {id},
            relations: ['house', 'payment_method'], 
        };
        const payment = await this.repo.findOne(options);
    
        return payment;
    }

    //get all payments in the db
    async findAll(options?: FindManyOptions<Payments>){
        const payments = await this.repo.find({ ...options , relations:['house', 'payment_method']});

        if (!payments || payments.length === 0){
            throw new NotFoundException('Payment not found.')
        }
        return payments;
    } 


    //verify payment from chapa and change status
    async updatePaymentStatus(id: number){
        const payment = await this.findOne(id);

        if(payment.status === "unpaid"){
            const tx_ref = payment.tx_ref;
            const headers = {
                'Authorization': 'Bearer CHASECK_TEST-kdLyaIRGQkug9UjBlIvBFjgoDnja2vIl',
              };

            try {
                const url = `https://api.chapa.co/v1/transaction/verify/${tx_ref}`
                const response = await axios.get(url,  { headers });

                return {
                    status: response.status,
                    data: response.data,
                };
            } catch (error) {
                // console.error('Error:', error.response.data);
                return {
                    status: error.response.status,
                    data: error.response.data,
                  };
            }
        }
    }
}
