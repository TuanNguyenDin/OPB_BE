import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './entities/dish.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.EXPIRES_IN_SECONDS,
    }
  })
  ],
  controllers: [DishController],
  providers: [DishService, AuthGuard],
})
export class DishModule { }
