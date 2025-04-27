import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { JoinGroupDto } from './dto/join-group.dto';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService){}
  async create(createGroupDto: CreateGroupDto) {
    try {
      return await this.prisma.group.create({
        data: createGroupDto
      });
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async findAll() {
    try {
      return await this.prisma.group.findMany();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.group.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Group not found')
      }
      return one;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    try {
      const one = await this.prisma.group.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Group not found')
      }
      return await this.prisma.group.update({ where: { id }, data: updateGroupDto });
    } catch (error) {
      if (error.code === 'P2003') { 
        throw new BadRequestException('groupId is not valid or fromId not found');
      }
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async remove(id: string) {
    try {
      const one = await this.prisma.group.findFirst({ where: { id }})
      if (!one) {
        throw new BadRequestException('Group not found')
      }
      return await this.prisma.group.delete({ where: { id }});
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async joinGr(joinGroupDto: JoinGroupDto, req: Request) {
    try {
      return await this.prisma.user.update({
        where: {
          id: req['user'].id
        }, 
        data: {
          groups: {
            connect: [{id: joinGroupDto.groupId}]
          }
        }
      })
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }

  async getGr(req: Request) {
    try {
      return await this.prisma.group.findMany({
        where: {
          users: {
            some: {
              id: req['user'].id
            }
          }
        }
      })
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message || `Internal server error`)
    }
  }
}
