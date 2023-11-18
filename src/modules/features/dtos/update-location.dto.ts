import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocationDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    relative_location: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lat: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    long: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    community: string;
}