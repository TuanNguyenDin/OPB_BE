import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('service')
@ApiTags('Service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('account/:account_id')
  @ApiOperation({summary: 'Creates a service'})
  create(@Param('account_id') account_id: string,@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto, account_id);
  }

  @Get()
  @ApiOperation({summary: 'Finds all services'})
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Finds a service'})
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Updates a service'})
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletes a service'})
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
