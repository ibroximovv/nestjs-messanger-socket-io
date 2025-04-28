import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ChannelService {
  constructor(private readonly prisma: PrismaService){}
  async create(createChannelDto: CreateChannelDto, req: Request) {
    try {
      return await this.prisma.channel.create({ data: {
        name: createChannelDto.name,
        channelUserName: createChannelDto.channelUserName,
        ownerId: req['user'].id
      }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async findAll() {
    try {
      return await this.prisma.channel.findMany();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async update(id: string, updateChannelDto: UpdateChannelDto) {
    try {
      const one = await this.prisma.channel.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Chanel not found')
      }
      return await this.prisma.channel.update({ where: { id }, data: updateChannelDto });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.channel.delete({ where: { id }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }
}
