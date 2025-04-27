import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGroupDto {
    @ApiProperty({ example: 'group_username' })
    @IsString()
    groupUserName: string

    @ApiProperty({ example: 'n17' })
    @IsString()
    name: string
}
