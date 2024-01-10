import { Controller, Get, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect('/swagger', 301)
  @ApiOperation({ summary: 'Redirects to Swagger' })
  getDocs(): void {
    return;
  }

  @Get('check_render')
  @Render('index')
  async gethello(@Res() res: Response): Promise<void> {
    res.json({ message: this.appService.getHello() });
  }
}
