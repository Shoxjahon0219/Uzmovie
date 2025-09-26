import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    example: "Shoxjahon",
    minLength: 3,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  login: string;

  @ApiProperty({
    type: String,
    example: "Shoxjahon_baby",
    minLength:6,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
