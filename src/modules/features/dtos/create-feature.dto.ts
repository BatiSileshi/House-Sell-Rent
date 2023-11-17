import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateFeatureDto{
    @ApiProperty()
    @IsNumber()
    bedrooms: number;

    @ApiProperty()
    @IsNumber()
    bathrooms: number;


    @ApiProperty()
    @IsString()
    flooring: string;

    @ApiProperty()
    @IsString()
    basement: string;

    @ApiProperty()
    @IsString()
    kitchen: string;

    @ApiProperty()
    @IsNumber()
    living_rooms: number;

    @ApiProperty()
    @IsNumber()
    total_rooms: number;

    @ApiProperty()
    @IsString()
    utility: string;

    @ApiProperty()
    built_in: Date;

    @ApiProperty()
    @IsString()
    special_thing: string;


}