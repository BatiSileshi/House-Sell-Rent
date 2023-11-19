import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaymentStatusDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;
}