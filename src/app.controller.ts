import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect('/swagger', 301)
  @ApiOperation({ summary: 'Redirects to Swagger' })
  getDocs(): void {
    return
  }
  @Get('check_render')
  @Render('index')
  getHello() {
    return { message: this.appService.getHello() }
  }
}
