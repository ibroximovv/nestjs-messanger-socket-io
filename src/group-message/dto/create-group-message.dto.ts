import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGroupMessageDto {
    @ApiProperty()
    @IsString()
    groupId: string

    @ApiProperty({ example: 'Helloooo group'})
    @IsString()
    text: string
}
