import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('location')
@ApiTags('Location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({summary: 'Creates an address'})
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({summary: 'Finds all addresses'})
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Finds an address'})
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Updates an address'})
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Deletes an address'})
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
