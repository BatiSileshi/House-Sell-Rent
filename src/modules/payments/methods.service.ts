import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentMethods } from "./methods.entity";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreatePaymentMethodDto } from "./dtos/create-methods.dto";


@Injectable()
export class PaymentMethodsService{
    constructor(
        @InjectRepository(PaymentMethods)
        private repo: Repository<PaymentMethods>
    ){}

    //create payment method
    create(createPaymentMethodDto: CreatePaymentMethodDto){
        const payment_method = this.repo.create(createPaymentMethodDto);
        return this.repo.save(payment_method);
    }

    //get single payment method
    async findOne(id: number){
        if(!id){
            return null;
        }
        const options: FindOneOptions<PaymentMethods>={
            where: {id},
        };

        return await this.repo.findOne(options);
    }

    //get all payment methods
    async findAll(options?: FindManyOptions<PaymentMethods>){
        const payment_methods = await this.repo.find({ ...options });

        if (!payment_methods || payment_methods.length === 0){
            throw new NotFoundException('Payment methods not found.')
        }
        return payment_methods;
    }

    // update payment_methods
    async update(id: number, attrs: Partial<PaymentMethods>){
        const payment_method = await this.findOne(id);
        if(!payment_method){
            throw new NotFoundException("Payment method not found.")
        }

        Object.assign(payment_method, attrs);
        return this.repo.save(payment_method);
    }

    // delete payment_methods
    async remove(id: number){
        const payment_method = await this.findOne(id);
        if(!payment_method){
            throw new NotFoundException("Payment method not found.")
        }
        return this.repo.remove(payment_method);
    }
}