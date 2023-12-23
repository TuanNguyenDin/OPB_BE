import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UpdateNotifyDto } from './dto/update-notify.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('notify')
@ApiTags('Notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a notify' })
  @ApiResponse({ status: 201, description: 'The notify has been successfully created.' })
  @ApiResponse({ status: 404, description: 'The notify has not been created.' })
  create(@Body() createNotifyDto: CreateNotifyDto) {
    return this.notifyService.create(createNotifyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notify' })
  @ApiResponse({ status: 200, description: 'The notify has been successfully returned.' })
  findAll() {
    return this.notifyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notify' })
  @ApiResponse({ status: 200, description: 'The notify has been successfully returned.' })
  @ApiResponse({ status: 404, description: 'The notify has not been found.' })
  findOne(@Param('id') id: string) {
    return this.notifyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notify' })
  @ApiResponse({ status: 200, description: 'The notify has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'The notify has not been found.' })
  update(@Param('id') id: string, @Body() updateNotifyDto: UpdateNotifyDto) {
    return this.notifyService.update(id, updateNotifyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notify' })
  @ApiResponse({ status: 200, description: 'The notify has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.notifyService.remove(id);
  }

  @Get('/:prop/:value')
  @ApiOperation({ summary: 'Get a notify by condition' })
  @ApiResponse({ status: 200, description: 'The notify has been successfully returned.' })
  @ApiResponse({ status: 404, description: 'The notify has not been found.' })
  findByCondition(@Param('prop') prop: string, @Param('value') value: string) {
    return this.notifyService.findByCondition(prop, value);
  }

  @Patch('/:prop/:value/read')
  @ApiOperation({ summary: 'Update a notify to read' })
  @ApiResponse({ status: 200, description: 'The notify has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'The notify has not been found.' })
  updateRead(@Param('prop') prop: string, @Param('value') value: string) {
    return this.notifyService.updateIsReadByCondition(prop, value);
  }
}
