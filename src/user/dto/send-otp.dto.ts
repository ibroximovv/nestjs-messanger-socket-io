import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsPhoneNumber } from "class-validator";

export class SendOtpDto {
    @ApiProperty({ example: '+998910128133' })
    @IsMobilePhone()
    phone: string
}