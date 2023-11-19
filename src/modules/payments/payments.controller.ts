import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
    constructor(
        private paymentsServices: PaymentsService
    ){}

    @Post('/:id/create')
    @ApiBearerAuth()
    @ApiOperation({summary: "Create payment for house"})
    async createPayment(@Param('id') id:string, @Body() createPaymentDto: CreatePaymentDto){
        const createdPayment = await this.paymentsServices.create(parseInt(id), createPaymentDto);

        return createdPayment;
    }


    @Get('/:id/view')
    @ApiBearerAuth()
    async updateStatus(@Param('id') id: string){
        return await this.paymentsServices.updatePaymentStatus(parseInt(id));
    }
}
