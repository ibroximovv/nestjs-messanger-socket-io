import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString, Max, Min } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'alex1234' })
    @IsString()
    username: string

    @ApiProperty({ example: '+998910128133' })
    @IsPhoneNumber()
    phone: string

    @ApiProperty({ example: 'image.png' })
    @IsString()
    photo: string

    @ApiProperty({ example: '12345' })
    @IsString()
    otp: string
}