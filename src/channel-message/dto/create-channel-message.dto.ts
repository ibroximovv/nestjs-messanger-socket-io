import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateChannelMessageDto {
    @ApiProperty({ example: 'Hello channel'})
    @IsString()
    text: string

    @ApiProperty()
    @IsString()
    channelId: string
}
