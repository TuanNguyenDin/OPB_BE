import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema, Category } from './entities/category.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategoriesSchema }]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.EXPIRES_IN_SECONDS,
    }
  })
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, AuthGuard],
})
export class CategoriesModule { }
