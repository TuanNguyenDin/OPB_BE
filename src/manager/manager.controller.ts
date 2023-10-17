import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('manager')
@ApiTags('Manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() userdata) {
    return this.managerService.create(userdata);
  }

  @Get()
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
