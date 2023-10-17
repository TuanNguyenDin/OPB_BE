import { Module } from '@nestjs/common';
import { AuthService, FirebaseService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entities';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
    ,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.EXPIRES_IN_SECONDS,
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService,ConfigService],
})
export class AuthModule { }
