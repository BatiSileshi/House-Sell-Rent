import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateFeatureDto{
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    bedrooms: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    bathrooms: number;


    @ApiProperty()
    @IsString()
    @IsOptional()
    flooring: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    basement: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    kitchen: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    living_rooms: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    total_rooms: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    utility: string;

    @ApiProperty()
    @IsOptional()
    built_in: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    special_thing: string;
}