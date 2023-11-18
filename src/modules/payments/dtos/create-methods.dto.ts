import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentMethodDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    payment_type: string;

    @ApiProperty()
    @IsString()
    logo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    payment_method_identifier: string;

    @ApiProperty()
    @IsString()
    customer_service: string;
}