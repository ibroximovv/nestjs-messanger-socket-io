import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Request } from 'express';
import { JoinGroupDto } from './dto/join-group.dto';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get('my-groups')
  myGroups(@Req() req: Request) {
    return this.groupService.getGr(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @UseGuards(AuthorizationGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }

  @UseGuards(AuthorizationGuard)
  @Post('join-group')
  joinGroup(@Body() joinGroupDto: JoinGroupDto, @Req() req: Request){
    return this.groupService.joinGr(joinGroupDto, req)
  }
}
