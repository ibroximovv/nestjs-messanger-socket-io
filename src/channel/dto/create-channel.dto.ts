import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateChannelDto {
    @ApiProperty({ example: 'najot talim'})
    @IsString()
    name: string

    @ApiProperty({ example: 'nt_channel'})
    @IsString()
    channelUserName: string
}
