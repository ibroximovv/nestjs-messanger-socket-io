import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChannelMessageDto } from './dto/create-channel-message.dto';
import { UpdateChannelMessageDto } from './dto/update-channel-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ChannelMessageService {
  constructor(private readonly prisma: PrismaService){}
  async create(createChannelMessageDto: CreateChannelMessageDto, req: Request) {
    try {
      return await this.prisma.channelMessage.create({
        data: {
          text: createChannelMessageDto.text,
          channelId: createChannelMessageDto.channelId,
          fromId: req['user'].id
        }
      })
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.channelMessage.findMany();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.channelMessage.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('ChatMessage not found')
      }
      return one;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async update(id: string, updateChannelMessageDto: UpdateChannelMessageDto) {
    try {
      const one = await this.prisma.channelMessage.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('ChatMessage not found')
      }
      return this.prisma.channelMessage.update({ where: { id }, data: updateChannelMessageDto});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.channelMessage.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('ChatMessage not found')
      }
      return await this.prisma.channelMessage.delete({ where: { id }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
