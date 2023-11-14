import { IsString, IsOptional, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone_number: string;
}