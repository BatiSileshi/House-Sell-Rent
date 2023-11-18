import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto{
    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    relative_location: string;

    @ApiProperty()
    @IsString()
    lat: string;

    @ApiProperty()
    @IsString()
    long: string;

    @ApiProperty()
    @IsString()
    community: string;
}