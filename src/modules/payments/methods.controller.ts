import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PaymentMethodsService } from "./methods.service";
import { CreatePaymentMethodDto } from "./dtos/create-methods.dto";
import { UpdatePaymentMethodDto } from "./dtos/update.methods";

@ApiTags('payment-methods')
@Controller('payment-methods')
export class PaymentMethodsController{
    constructor(
        private paymentMethodsService: PaymentMethodsService
    ){}

    @Post('/')
    @ApiBearerAuth()
    @ApiOperation({summary: "Create payment method"})
    async createPaymentMethod(@Body() createPaymentMethodDto: CreatePaymentMethodDto){
        return this.paymentMethodsService.create(createPaymentMethodDto);
    }

    @Get('/')
    @ApiBearerAuth()
    @ApiOperation({summary: "Get payment methods"})
    async getPaymentMethods(){
        return await this.paymentMethodsService.findAll();
    }


    @Get(':id/get')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get single payment method.'})
    async getPaymentMethod(@Param('id') id: string){
        const payment_method = await this.paymentMethodsService.findOne(parseInt(id));
        if(!payment_method){
            throw new NotFoundException("Payment method not found.")
        }
        return payment_method;
    }


    @Patch(':id/update')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update single payment method.'})
    async updatePaymentMethod(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto){
        return await this.paymentMethodsService.update(parseInt(id), updatePaymentMethodDto);
    }

    @Delete(':id/delete')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete payment method.'})
    // @UseGuards(AuthGuard)
    async removePaymentMethod(@Param('id') id:string){
        return await this.paymentMethodsService.remove(parseInt(id));
    }

}