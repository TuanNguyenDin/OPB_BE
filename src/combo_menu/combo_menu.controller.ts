import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComboMenuService } from './combo_menu.service';
import { CreateComboMenuDto } from './dto/create-combo_menu.dto';
import { UpdateComboMenuDto } from './dto/update-combo_menu.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('combo-menu')
@ApiTags('Combo Menu')
export class ComboMenuController {
  constructor(private readonly comboMenuService: ComboMenuService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a package flown model type combo, food, or service' })
  create(@Body() createPackageDto: CreateComboMenuDto) {
    return this.comboMenuService.createPackage(createPackageDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Finds all package flown model type combo, food or service' })
  findAll() {
    return this.comboMenuService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Finds a package flown model type combo, food or service' })
  findOne(@Param('id') id: string) {
    return this.comboMenuService.findOne(id);
  }

  @Get('/restaurant/:id')
  @ApiOperation({ summary: 'Finds a package flown model type combo, food or service' })
  findByRestaurant(@Param('id') id: string) {
    return this.comboMenuService.findByRestaurant(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a package flown model type combo, food or service' })
  update(@Param('id') id: string, @Body() createPackageDto: CreateComboMenuDto) {
    return this.comboMenuService.update(id, createPackageDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes a package flown model type combo, food or service' })
  remove(@Param('id') id: string) {
    return this.comboMenuService.remove(id);
  }
}

