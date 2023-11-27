import { Controller, Get, Post, Body, Res, Req, Query } from '@nestjs/common';
import { DemoService } from './demo.service';
import { demoCreateUrlDto } from './dto/create-demo.dto';

import { type Response, type Request } from 'express';
import { OrderService } from '../order/order.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags('Payment')
export class DemoController {
  constructor(
    private readonly demoService: DemoService,
    private readonly orderService: OrderService,
  ) {}

  // @Get()
  // findAll(@Res() res: Response) {
  //   return res.render('order', { title: 'Tạo mới đơn hàng.' });
  // }

  @Post('create_payment_url')
  @ApiOperation({ summary: 'Creates a payment url' })
  postPaymentUrl(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: demoCreateUrlDto,
  ) {
    const ipAddr = req.headers['x-forwarded-for'] || '127.0.0.1';

    const url = this.demoService.demoCreatePaymentURL(
      typeof ipAddr === 'string' ? ipAddr : ipAddr[0],
      dto,
    );

    res.redirect(url.toString());
    return ({ "paymentUrl": url.toString() });
  }

  @Get('vnpay_return')
  vnpayReturn(@Query() query) {
    const result = this.orderService.checkReturn(query);
    return result;
  }

  @Get('vnpay_ipn')
  vnpayIpn(@Query() query) {
    return this.orderService.checkIpn(query);
  }

  // @Get('querydr')
  // getQuerydr(@Res() res: Response) {
  //   res.render('querydr', { title: 'Truy vấn kết quả thanh toán' });
  // }

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
    // return response;
    return({ data: JSON.stringify(response) });
  }

  // @Get('refund')
  // getRefund(@Res() res: Response) {
  //   res.render('refund', { title: 'Hoàn tiền giao dịch thanh toán' });
  // }
}
