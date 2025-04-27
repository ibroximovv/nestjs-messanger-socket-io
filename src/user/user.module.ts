import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SmsService } from 'src/sms/sms.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'jwtsecret' 
  })],
  controllers: [UserController],
  providers: [UserService, SmsService, JwtService, PrismaService],
})
export class UserModule {}
