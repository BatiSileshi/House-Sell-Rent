import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePictureDto{
    @ApiProperty()
    @IsString()
    picture: string;
}