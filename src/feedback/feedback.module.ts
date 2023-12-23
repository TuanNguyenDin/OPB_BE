import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackSchema } from './entities/feedback.entity';
import { OrderSchema } from 'src/order/entities/order.entity';
import { AccountSchema } from 'src/auth/entities/user.entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Feedback', schema: FeedbackSchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'Account', schema: AccountSchema },
    ])
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
