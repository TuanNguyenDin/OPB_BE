import { Module } from '@nestjs/common';
import { ComboMenuService } from './combo_menu.service';
import { ComboMenuController } from './combo_menu.controller';
import { ComboMenuSchema } from './entities/combo_menu.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ComboMenu', schema: ComboMenuSchema }])],
  controllers: [ComboMenuController],
  providers: [ComboMenuService],
})
export class ComboMenuModule { }
