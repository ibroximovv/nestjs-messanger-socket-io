import { PartialType } from '@nestjs/swagger';
import { CreateChannelMessageDto } from './create-channel-message.dto';

export class UpdateChannelMessageDto extends PartialType(CreateChannelMessageDto) {}
