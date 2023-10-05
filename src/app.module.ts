import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerModule } from './manager/manager.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env', '.dev.env']
  }),
  MongooseModule.forRoot(process.env.DATA_BASE),
    AuthModule,
    ManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
