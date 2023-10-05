import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CustomerService, AuthService } from './customer.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomerGuard, firebaseAuthentication } from './customer.guard';
import { auth } from 'src/firebaseConfig';

@Controller('api/customer')
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService,
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) { }
    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('password') password: string
    ) {
        const hashpassword = await bcrypt.hash(password, 12);
        return await this.customerService.createCustomers({ name: name, email: email, phone: phone, password: hashpassword })
    }
    @Post('login')
    async login(
        @Body('name') name: string,
        @Body('password') password: string
    ) {
        var customer = await this.customerService.findByEmail(name);
        if (!customer) customer = await this.customerService.findByName(name);
        if (!customer) {
            throw new BadRequestException('Invalid credentials, account not found!')
        } else {
            if (!await bcrypt.compare(password, customer.password)) { throw new BadRequestException('Invalid credentials, wrong password!') }
        }
        const jwt = await this.jwtService.sign({ id: customer._id })
        return {
            "accessToken": jwt,
            "expiresIn": "1h",
        };
    }
    @Get('Profile')
    @UseGuards(firebaseAuthentication)
    async getProfile(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
    ) {
        return await this.customerService.findByEmail(email);
    }
    @Post('firebase/register')
    async firebaseRegister(@Body() data) {
        // Call firebase auth register method
        const uid = await this.authService.register(
            data.email,
            data.password
        );

    }
    @Post('firebase/login')
    async firebaseLogin(@Body() data) {
        // Call firebase auth login method
        try {
            const userRecord = await this.authService.login(
                data.email,
                data.password
            );
            // Generate JWT token and return user
            return {
                userRecord
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
