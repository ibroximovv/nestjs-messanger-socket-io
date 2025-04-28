import { Module } from '@nestjs/common';
import { GlobalMessageService } from './global-message.service';
import { GlobalMessageController } from './global-message.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GlobalMessageController],
  providers: [GlobalMessageService, PrismaService],
})
export class GlobalMessageModule {}
