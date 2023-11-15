import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;
}