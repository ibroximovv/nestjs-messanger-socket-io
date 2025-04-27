import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateChatMessageDto {
    @ApiProperty()
    @IsString()
    toId: string
}
