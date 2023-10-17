import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from './entities/equipment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Equipment.name, schema: EquipmentSchema }]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.EXPIRES_IN_SECONDS,
    }
  })
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService, AuthGuard],
})
export class EquipmentModule { }
