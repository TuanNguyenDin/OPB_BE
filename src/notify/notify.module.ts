import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifySchema } from './entities/notify.entity';
import { Account, AccountSchema } from 'src/auth/entities/user.entities';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notify', schema: NotifySchema }, { name: Account.name, schema: AccountSchema }])],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule { }
