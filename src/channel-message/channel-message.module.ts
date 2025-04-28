import { Module } from '@nestjs/common';
import { ChannelMessageService } from './channel-message.service';
import { ChannelMessageController } from './channel-message.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChannelMessageController],
  providers: [ChannelMessageService, PrismaService],
})
export class ChannelMessageModule {}
