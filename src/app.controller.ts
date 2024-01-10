import { Controller, Get, Query, Redirect, Render, Res } from '@nestjs/common';
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
}
