import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ChannelMessageService } from './channel-message.service';
import { CreateChannelMessageDto } from './dto/create-channel-message.dto';
import { UpdateChannelMessageDto } from './dto/update-channel-message.dto';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('channel-message')
export class ChannelMessageController {
  constructor(private readonly channelMessageService: ChannelMessageService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() createChannelMessageDto: CreateChannelMessageDto, @Req() req: Request) {
    return this.channelMessageService.create(createChannelMessageDto, req);
  }

  @Get()
  findAll() {
    return this.channelMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelMessageService.findOne(id);
  }

  @UseGuards(AuthorizationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelMessageDto: UpdateChannelMessageDto) {
    return this.channelMessageService.update(id, updateChannelMessageDto);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelMessageService.remove(id);
  }
}
