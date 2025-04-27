import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupMessageService {
  constructor(private readonly prisma: PrismaService){}
  async create(createGroupMessageDto: CreateGroupMessageDto, req: Request) {
    try {
      return await this.prisma.groupMessage.create({
        data: {
          text: createGroupMessageDto.text,
          groupId: createGroupMessageDto.groupId,
          fromId: req['user'].id
        }
      });
    } catch (error) {
      if(error.code === 'P2003') {
        throw new BadRequestException('groupId is not valid or user not found');
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async findAll(groupId: string) {
    try {
      return await this.prisma.groupMessage.findMany({ where: {
        groupId: groupId
      }});
    } catch (error) {
      if(error.code === 'P2003') {
        throw new BadRequestException('groupId is not valid or user not found');
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async update(id: string, updateGroupMessageDto: UpdateGroupMessageDto) {
    try {
      const one = await this.prisma.groupMessage.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Group on message not found')
      }
      return await this.prisma.groupMessage.update({ where: { id }, data: updateGroupMessageDto });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.groupMessage.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Group on message not found')
      }
      return await this.prisma.groupMessage.delete({ where: { id }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }
}
