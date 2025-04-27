import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService ){}
  async create(createMessageDto: CreateMessageDto, req: Request) {
    try {
      return await this.prisma.message.create({ data: {
        fromId: req['user'].id,
        toId: createMessageDto.toId,
        text: createMessageDto.text,
        chatId: createMessageDto.chatId
      }});
    } catch (error) {
      if (error.code === 'P2003') { 
        throw new BadRequestException('toId  or chatid is not valid or fromId not found');
      }
      console.log(error.message);
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      return await this.prisma.message.findMany();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.message.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Message not found')
      }
      return one;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    try {
      const one = await this.prisma.message.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Message not found')
      }
      return await this.prisma.message.update({ where: { id }, data: updateMessageDto });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.message.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Message not found')
      }
      return await this.prisma.message.delete({ where: { id }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }
}
