import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    phone_number: string;
}