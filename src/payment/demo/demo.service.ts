import { Injectable } from '@nestjs/common';
import { demoCreateUrlDto } from './dto/create-demo.dto';
import { DateTime } from 'luxon';
import { createHmac } from 'crypto';
import { VNP_URL, VNP_VERSION } from '../order/constants/api.constant';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DemoService {
  private tmnCode: string;
  private hashSecret: string;
  private returnUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.tmnCode = this.configService.get('VNP_TMNCODE');
    this.hashSecret = this.configService.get('VNP_HASH_SECRET');
    this.returnUrl = this.configService.get('VNP_RETURN_URL');
  }

  demoCreatePaymentURL(
    ip: string,
    { amount, language, bankcode }: demoCreateUrlDto,
  ) {
    const now = DateTime.now().setZone('Asia/Ho_Chi_Minh');
    const nowFormat = now.toFormat('yyyyLLddHHmmss');
    const orderIds = now.toFormat('ddHHmmss');

    const url = new URL(VNP_URL);

    url.searchParams.set('vnp_Version', VNP_VERSION);
    url.searchParams.set('vnp_Command', 'pay');
    url.searchParams.set('vnp_TmnCode', this.tmnCode);
    url.searchParams.set('vnp_Locale', language);
    url.searchParams.set('vnp_CurrCode', 'VND');
    url.searchParams.set('vnp_TxnRef', orderIds);
    url.searchParams.set('vnp_OrderInfo', 'Giao dich số ' + orderIds);
    url.searchParams.set('vnp_OrderType', 'other');
    url.searchParams.set('vnp_Amount', (+amount * 100).toString());
    url.searchParams.set('vnp_ReturnUrl', this.returnUrl);
    url.searchParams.set('vnp_IpAddr', ip);
    url.searchParams.set('vnp_CreateDate', nowFormat);

    if (bankcode !== null && bankcode !== '' && bankcode !== undefined) {
      url.searchParams.set('vnp_BankCode', bankcode);
    }

    url.searchParams.sort();

    const hmac = createHmac('SHA512', this.hashSecret);
    const signed = hmac
      .update(Buffer.from(url.searchParams.toString(), 'utf-8'))
      .digest('hex');

    url.searchParams.set('vnp_SecureHash', signed);

    console.log(url.toString());

    return url;
  }
}
