import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { GlobalMessageService } from './global-message.service';
import { CreateGlobalMessageDto } from './dto/create-global-message.dto';
import { UpdateGlobalMessageDto } from './dto/update-global-message.dto';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('global-message')
export class GlobalMessageController {
  constructor(private readonly globalMessageService: GlobalMessageService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() createGlobalMessageDto: CreateGlobalMessageDto, @Req() req: Request) {
    return this.globalMessageService.create(createGlobalMessageDto, req);
  }

  @Get()
  findAll() {
    return this.globalMessageService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalMessageDto: UpdateGlobalMessageDto) {
    return this.globalMessageService.update(id, updateGlobalMessageDto);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalMessageService.remove(id);
  }
}
