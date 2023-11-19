import { IsString, IsEmail, IsNotEmpty, isNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tx_ref: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    payment_method: number;
}