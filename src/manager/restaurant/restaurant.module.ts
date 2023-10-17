import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from './entities/restaurant.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name:'restaurant', schema: RestaurantSchema}]),JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.EXPIRES_IN_SECONDS,
    }})],
  controllers: [RestaurantController],
  providers: [RestaurantService,AuthGuard],
})
export class RestaurantModule {}
