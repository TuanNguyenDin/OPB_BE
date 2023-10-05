import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entities';

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
  providers: [AuthService],
})
export class AuthModule { }
