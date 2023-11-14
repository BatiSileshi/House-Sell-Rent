import { IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProfileDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phone_number2: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    avatar: string;
    
}