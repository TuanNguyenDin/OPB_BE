import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manager, ManagerSchema } from './entities/manager.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CategoriesModule } from './categories/categories.module';
import { EquipmentModule } from './equipment/equipment.module';
import { DishModule } from './dish/dish.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }])
  ,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.EXPIRES_IN_SECONDS,
    }}),RestaurantModule, CategoriesModule, EquipmentModule, DishModule],
  controllers: [ManagerController],
  providers: [ManagerService, AuthGuard],
})
export class ManagerModule { }
