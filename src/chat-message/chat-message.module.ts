import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService, PrismaService],
})
export class ChatMessageModule {}
