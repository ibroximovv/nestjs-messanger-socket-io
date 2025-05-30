import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsService } from './sms/sms.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { MessageModule } from './message/message.module';
import { GroupModule } from './group/group.module';
import { GroupMessageModule } from './group-message/group-message.module';
import { MulterController } from './multer/multer.controller';
import { GlobalMessageModule } from './global-message/global-message.module';
import { ChannelModule } from './channel/channel.module';
import { ChannelMessageModule } from './channel-message/channel-message.module';

@Module({
  imports: [UserModule, PrismaModule, ChatMessageModule, MessageModule, GroupModule, GroupMessageModule, GlobalMessageModule, ChannelModule, ChannelMessageModule],
  controllers: [AppController, MulterController],
  providers: [AppService, SmsService],
})
export class AppModule {}
