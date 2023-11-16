import { IsString, IsNumber, IsNotEmpty, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHouseDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    length: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    width: number;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    category: number;
}