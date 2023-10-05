import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}
    @Post('signup')
    async signUp(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('password') password: string
    ) {
        return await this.authService.register({ name: name, email: email, phone: phone, password: password })
    }
    @Post('signin')
    async signIn(
        @Body() data
    ){
        return await this.authService.login(data);
    }
}
