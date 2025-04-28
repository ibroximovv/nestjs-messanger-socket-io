import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGlobalMessageDto {
    @ApiProperty({ example: 'Hello global chat'})
    @IsString()
    text: string
}
