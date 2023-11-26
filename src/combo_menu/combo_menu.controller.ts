import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComboMenuService } from './combo_menu.service';
import { CreateComboMenuDto, CreateFoodPackageDto, CreatePackageDto, CreateServicePackageDto } from './dto/create-combo_menu.dto';
import { UpdateComboMenuDto } from './dto/update-combo_menu.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('combo-menu')
@ApiTags('Combo Menu')
export class ComboMenuController {
  constructor(private readonly comboMenuService: ComboMenuService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a package flown model type combo, food, or service' })
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.comboMenuService.createPackage(createPackageDto.data, createPackageDto.modelType);
  }
  
  @Get(':modelType')
  @ApiOperation({ summary: 'Finds all package flown model type combo, food or service' })
  findAll(@Param('modelType') modelType: 'combo' | 'food' | 'service') {
    return this.comboMenuService.findAll(modelType);
  }

  @Get(':modelType/:id')
  @ApiOperation({ summary: 'Finds a package flown model type combo, food or service' })
  findOne(@Param('id') id: string, @Param('modelType') modelType: 'combo' | 'food' | 'service') {
    return this.comboMenuService.findOne(id, modelType);
  }

  @Get('/restaurant/:modelType/:id')
  @ApiOperation({ summary: 'Finds a package flown model type combo, food or service' })
  findByRestaurant(@Param('id') id: string, @Param('modelType') modelType: 'combo' | 'food' | 'service') {
    return this.comboMenuService.findByRestaurant(id, modelType);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a package flown model type combo, food or service' })
  update(@Param('id') id: string, @Body() createPackageDto: CreatePackageDto) {
    return this.comboMenuService.update(id, createPackageDto.data, createPackageDto.modelType);
  }

  @Delete(':modelType/:id')
  @ApiOperation({ summary: 'Deletes a package flown model type combo, food or service' })
  remove(@Param('id') id: string, @Param('modelType') modelType: 'combo' | 'food' | 'service') {
    return this.comboMenuService.remove(id, modelType);
  }
}

