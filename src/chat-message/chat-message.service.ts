import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ChatMessageService {
  
  constructor(private readonly prisma: PrismaService){}
  async create(createChatMessageDto: CreateChatMessageDto, req: Request) {
    try {
      const data = await this.prisma.chat.create({ data: {
        fromId: req['user'].id,
        toId: createChatMessageDto.toId
      }})
      return data;
    } catch (error) {
      if (error.code === 'P2003') { 
        throw new BadRequestException('toId is not valid or fromId not found');
      }
      console.log(error.message);
      throw new InternalServerErrorException
    }
  }

  async findAll() {
    try {
      return await this.prisma.chat.findMany();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.chat.findFirst({ where: { id }})
      if (!one) {
        return { message: 'chat not found' }
      }
      return one;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException
    }
  }

  async update(id: string, updateChatMessageDto: UpdateChatMessageDto) {
    try {
      const one = await this.prisma.chat.findFirst({ where: { id }})
      if (!one) {
        return { message: 'chat not found' }
      }
      return await this.prisma.chat.update({ where: { id }, data: updateChatMessageDto });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.chat.findFirst({ where: { id }})
      if (!one) {
        return { message: 'chat not found' }
      }
      return await this.prisma.chat.delete({ where: { id }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException
    }
  }
}
