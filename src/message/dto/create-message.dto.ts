import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMessageDto {
    @ApiProperty({ example: 'Hello' })
    @IsString()
    text: string

    @ApiProperty()
    @IsString()
    toId: string

    @ApiProperty()
    @IsString()
    chatId: string
}
