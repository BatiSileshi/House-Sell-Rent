import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePictureDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    picture: string;
}