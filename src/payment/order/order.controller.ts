import {
  Controller,
  Post,
  Req,
  Body,
  Res,
  Query,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { type Request, type Response } from 'express';
import { createPaymentURLDto } from './dtos/order.dto';

@Controller('vnpay/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      forbidUnknownValues: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  createPaymentUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: createPaymentURLDto,
  ) {
    const ipAddr = req.headers['x-forwarded-for'];

    const url = this.orderService.createPaymentURL(
      typeof ipAddr === 'string' ? ipAddr : ipAddr[0],
      dto,
    );

    res.redirect(url.toString());
  }

  @Get('create_payment_url')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      forbidUnknownValues: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  getQuery(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: createPaymentURLDto,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';

    const url = this.orderService.createPaymentURL(
      query.ip ?? (typeof ipAddr === 'string' ? ipAddr : ipAddr[0]),
      query,
    );

    res.json({ url: url.toString() });
  }

  @Post('create_payment_url')
  postPaymentUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: createPaymentURLDto,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';

    const url = this.orderService.createPaymentURL(
      dto.ip ?? (typeof ipAddr === 'string' ? ipAddr : ipAddr[0]),
      dto,
    );

    res.redirect(url.toString());
  }

  @Get('vnpay_return')
  vnpayReturn(@Query() query) {
    const result = this.orderService.checkReturn(query);
    return result;
  }

  @Get('vnpay_ipn')
  vnpayIpn(@Query() query) {
    console.log('ipn called at ', new Date().toISOString());
    return this.orderService.checkIpn(query);
  }

  @Post('querydr')
  async postQuerydr(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: Record<string, any>,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';
    const response = await this.orderService.queryDr(
      dto,
      typeof ipAddr === 'string' ? ipAddr : ipAddr[0],
    );
    return response;
  }
}