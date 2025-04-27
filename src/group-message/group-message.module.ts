import { Module } from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { GroupMessageController } from './group-message.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GroupMessageController],
  providers: [GroupMessageService, PrismaService],
})
export class GroupMessageModule {}
