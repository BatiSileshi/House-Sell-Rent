import { IsString, IsNumber, IsOptional, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateHouseDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    length: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    width: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;
}