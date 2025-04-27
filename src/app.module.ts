import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsService } from './sms/sms.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { MessageModule } from './message/message.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [UserModule, PrismaModule, ChatMessageModule, MessageModule, GroupModule],
  controllers: [AppController],
  providers: [AppService, SmsService],
})
export class AppModule {}
