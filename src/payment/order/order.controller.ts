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
  Redirect,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { type Request, type Response } from 'express';
import { createPaymentURLDto } from './dtos/order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';
import { payment } from 'src/payment/payment.entity';
import { Render } from '@nestjs/common';

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
  async createPaymentUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: createPaymentURLDto,
    @Param('orderCreated') orderCreated: string,
  ) {
    const ipAddr = req.headers['x-forwarded-for'];

    const url = await this.orderService.createPaymentURL(
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
  async getQuery(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: createPaymentURLDto,
    @Param('orderCreated') orderCreated: string,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';

    const url = await this.orderService.createPaymentURL(
      query.ip ?? (typeof ipAddr === 'string' ? ipAddr : ipAddr[0]),
      query, orderCreated
    );

    res.json({ data: url.paymentStore, url: url.url.toString() });
  }

  @Post('create_payment_url/:orderCreated')
  async postPaymentUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: createPaymentURLDto,
    @Param('orderCreated') orderCreated: string,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';

    const url = await this.orderService.createPaymentURL(
      dto.ip ?? (typeof ipAddr === 'string' ? ipAddr : ipAddr[0]),
      dto, orderCreated
    );

    res.json({ data: url.paymentStore, url: url.url.toString() });
  }

  @Get('vnpay_return')
  @Redirect('/success.html')
  @ApiOperation({ summary: 'Check return from vnpay, auto run after do payment, default return is code 99 transaction fail' })
  async vnpayReturn(@Query() query, @Res() res: Response) {
    const result = await this.orderService.checkReturn(query);
    // res.render('success.html', { message: result?.message, root: 'views' });
    const jsonData = JSON.stringify(result);
    query.message = jsonData;
    if (result.status) {
      return { url: `/success.html?message=${query.message}` };
    } else {
      return { url: `/fail.html?message=${query.message}` }
    }
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

  @Post("/refund/:orderId")
  @ApiOperation({ summary: 'Refund payment' })
  async refund(
    @Req() req: Request,
    @Res() res: Response,
    @Param('orderId') orderId: string,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';
    const response = await this.orderService.refund(
      orderId,
      typeof ipAddr === 'string' ? ipAddr : ipAddr[0],
    );
    if (response) {
      return res.json({ response: response, message: "Refund payment success" });
    } else {
      return res.json({ response: response, message: "Refund payment fail" });
    }
  }

  @Get('find_payment/:orderId')
  @ApiOperation({ summary: 'Find payment by order ID' })
  async findPaymentByOrderId(
    @Param('orderId') orderId: string,
  ) {
    const payment = await this.orderService.findPaymentByOrderId(orderId);
    const completedPayments = payment.filter(p => p.status === "completed");
    return {
      statusCode: completedPayments.length,
      data: payment
    };
  }
}
