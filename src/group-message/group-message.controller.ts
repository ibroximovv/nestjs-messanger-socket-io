import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { GroupMessageService } from './group-message.service';
import { CreateGroupMessageDto } from './dto/create-group-message.dto';
import { UpdateGroupMessageDto } from './dto/update-group-message.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { Request } from 'express';

@Controller('group-message')
export class GroupMessageController {
  constructor(private readonly groupMessageService: GroupMessageService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() createGroupMessageDto: CreateGroupMessageDto, @Req() req: Request) {
    return this.groupMessageService.create(createGroupMessageDto, req);
  }

  @Get()
  findAll(@Query('groupId') groupId: string) {
    return this.groupMessageService.findAll(groupId);
  }

  @UseGuards(AuthorizationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupMessageDto: UpdateGroupMessageDto) {
    return this.groupMessageService.update(id, updateGroupMessageDto);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMessageService.remove(id);
  }
}
