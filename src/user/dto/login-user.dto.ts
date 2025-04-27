import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class LoginUserDto {
    @ApiProperty({ example: '+998910128133'})
    @IsPhoneNumber()
    phone: string
}