import { Module } from '@nestjs/common';
import { AuthService, CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema, Customer } from './customerDTO/customer.schema';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseModule } from 'nestjs-firebase';
import { firebaseConfig } from 'src/firebaseConfig';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),

  JwtModule.register({
    secret:'secret',
    signOptions:{
      expiresIn: '1h',
    }
  }),
],
  providers: [CustomerService, AuthService],
  controllers: [CustomerController]
})
export class CustomerModule { }
