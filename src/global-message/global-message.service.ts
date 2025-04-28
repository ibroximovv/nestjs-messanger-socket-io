import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGlobalMessageDto } from './dto/create-global-message.dto';
import { UpdateGlobalMessageDto } from './dto/update-global-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class GlobalMessageService {
  constructor(private readonly prisma: PrismaService){}
  async create(createGlobalMessageDto: CreateGlobalMessageDto, req: Request) {
    try {
      return await this.prisma.globalMessage.create({ data: {
        text: createGlobalMessageDto.text,
        fromId: req['user'].id
      }})
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async findAll() {
    try {
      return await this.prisma.globalMessage.findMany()
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async update(id: string, updateGlobalMessageDto: UpdateGlobalMessageDto) {
    try {
      const one = await this.prisma.globalMessage.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('GlobalMessage not found')
      }
      return await this.prisma.globalMessage.update({ where: { id }, data: updateGlobalMessageDto})
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.globalMessage.delete({ where: { id }})
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }
}
