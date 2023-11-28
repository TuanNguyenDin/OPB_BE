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
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { type Request, type Response } from 'express';
import { createPaymentURLDto } from './dtos/order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('vnpay/order')
@ApiTags('Payment')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post(':orderCreated')
  @ApiOperation({ summary: 'Creates a payment url' })
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
    @Param('orderCreated') orderCreated: string,
  ) {
    const ipAddr = req.headers['x-forwarded-for'];

    const url = this.orderService.createPaymentURL(
      typeof ipAddr === 'string' ? ipAddr : ipAddr[0],
      dto, orderCreated
    );

    res.json({ data: url.paymentStore, url: url.url.toString() });
  }

  @Get('create_payment_url/:orderCreated')
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
    @Param('orderCreated') orderCreated: string,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';

    const url = this.orderService.createPaymentURL(
      query.ip ?? (typeof ipAddr === 'string' ? ipAddr : ipAddr[0]),
      query, orderCreated
    );

    res.json({ data: url.paymentStore, url: url.url.toString() });
  }

  @Post('create_payment_url/:orderCreated')
  postPaymentUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: createPaymentURLDto,
    @Param('orderCreated') orderCreated: string,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';

    const url = this.orderService.createPaymentURL(
      dto.ip ?? (typeof ipAddr === 'string' ? ipAddr : ipAddr[0]),
      dto, orderCreated
    );

    res.json({ data: url.paymentStore, url: url.url.toString() });
  }

  @Get('vnpay_return')
  @ApiOperation({ summary: 'Check return from vnpay, auto run after do payment, default return is code 99 transaction fail' })
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
  @ApiOperation({ summary: 'Query payment results' })
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
