import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePhoneNumberDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_number: string;
}