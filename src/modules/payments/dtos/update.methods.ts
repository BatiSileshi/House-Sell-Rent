import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaymentMethodDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    payment_type: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    logo: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    payment_method_identifier: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    customer_service: string;
}