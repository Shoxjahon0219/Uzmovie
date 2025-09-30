import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateGenreDto {
    @ApiProperty({
        type: String,
        example: "Drama",   
        minLength: 3,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}
