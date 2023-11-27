import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { DateTime } from 'luxon';
import { createHmac } from 'crypto';
import { lastValueFrom } from 'rxjs';

import { VNP_URL, VNP_VERSION } from './constants/api.constant';

import { createPaymentURLDto } from './dtos/order.dto';

@Injectable()
export class OrderService {
  tmnCode: string;
  hashSecret: string;
  returnUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.tmnCode = this.configService.get('VNP_TMNCODE');
    this.hashSecret = this.configService.get('VNP_HASH_SECRET');
    this.returnUrl = this.configService.get('VNP_RETURN_URL');
  }
  createPaymentURL(
    ip: string,
    {
      amount,
      language,
      message,
      bankCode,
      orderId,
      returnUrl,
    }: createPaymentURLDto,
  ) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const now = DateTime.now().setZone('Asia/Ho_Chi_Minh');
    const nowFormat = now.toFormat('yyyyLLddHHmmss');
    const orderIds = orderId ?? now.toFormat('ddHHmmss');

    const url = new URL(VNP_URL);

    url.searchParams.set('vnp_Version', VNP_VERSION);
    url.searchParams.set('vnp_Command', 'pay');
    url.searchParams.set('vnp_TmnCode', this.tmnCode);
    url.searchParams.set('vnp_Locale', language);
    url.searchParams.set('vnp_CurrCode', 'VND');
    url.searchParams.set('vnp_TxnRef', orderIds);
    url.searchParams.set('vnp_OrderInfo', message);
    url.searchParams.set('vnp_OrderType', 'other');
    url.searchParams.set('vnp_Amount', (amount * 100).toString());
    url.searchParams.set('vnp_ReturnUrl', returnUrl ?? this.returnUrl);
    url.searchParams.set('vnp_IpAddr', ip);
    url.searchParams.set('vnp_CreateDate', nowFormat);

    if (bankCode !== null && bankCode !== '' && bankCode !== undefined) {
      url.searchParams.set('vnp_BankCode', bankCode);
    }

    url.searchParams.sort();

    const hmac = createHmac('SHA512', this.hashSecret);
    const signed = hmac
      .update(Buffer.from(url.searchParams.toString(), 'utf-8'))
      .digest('hex');

    url.searchParams.set('vnp_SecureHash', signed);

    return url;
  }

  checkReturn(query: any) {
    const vnp_Params = query;

    const secureHash = vnp_Params['vnp_SecureHash'];
    const responseCode = vnp_Params['vnp_ResponseCode'];
    const orderId = vnp_Params['vnp_TxnRef'];
    const orderInfo = vnp_Params['vnp_OrderInfo'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const newParams = new URLSearchParams(vnp_Params).toString();

    const hmac = createHmac('SHA512', this.hashSecret);
    const signed = hmac.update(Buffer.from(newParams, 'utf-8')).digest('hex');

    if (signed === secureHash) {
      switch (responseCode) {
        case '00':
          return {
            orderId,
            orderInfo,
            RspCode: '00',
            message: 'Thành công',
            status: true,
          };
        case '07':
          return {
            orderId,
            orderInfo,
            RspCode: '07',
            message:
              'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
            status: false,
          };
        case '09':
          return {
            orderId,
            orderInfo,
            RspCode: '09',
            message:
              'Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng',
            status: false,
          };
        case '10':
          return {
            orderId,
            orderInfo,
            RspCode: '10',
            message:
              'Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng',
            status: false,
          };
        case '11':
          return {
            orderId,
            orderInfo,
            RspCode: '11',
            message:
              'Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
            status: false,
          };
        case '12':
          return {
            orderId,
            orderInfo,
            RspCode: '12',
            message:
              'Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
            status: false,
          };
        case '13':
          return {
            orderId,
            orderInfo,
            RspCode: '13',
            message:
              'Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
            status: false,
          };
        case '24':
          return {
            orderId,
            orderInfo,
            RspCode: '24',
            message:
              'Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
            status: false,
          };
        case '51':
          return {
            orderId,
            orderInfo,
            RspCode: '51',
            message:
              'Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
            status: false,
          };
        case '65':
          return {
            orderId,
            orderInfo,
            RspCode: '65',
            message:
              'Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
            status: false,
          };
        case '75':
          return {
            orderId,
            orderInfo,
            RspCode: '75',
            message:
              'Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
            status: false,
          };
        case '79':
          return {
            orderId,
            orderInfo,
            RspCode: '79',
            message:
              'KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịc',
            status: false,
          };
        case '99':
          return {
            orderId,
            orderInfo,
            RspCode: '99',
            message: 'Lỗi khác chưa xác định',
            status: false,
          };
      }
    }
    return {
      orderId,
      orderInfo,
      RspCode: '99',
      message: 'Giao dich thất bại',
      status: false,
    };
  }

  checkIpn(query: Record<string, any>) {
    const vnp_Params = query;
    console.log(query);

    const secureHash: string = vnp_Params['vnp_SecureHash'];

    // const orderId: string = vnp_Params['vnp_TxnRef'];
    const rspCode: string = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const newParams = new URLSearchParams(vnp_Params).toString();

    const hmac = createHmac('SHA512', this.hashSecret);
    const signed = hmac.update(Buffer.from(newParams, 'utf-8')).digest('hex');

    const paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    // let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    // let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    const checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    const checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn

    if (secureHash === signed) {
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus === '0') {
            if (rspCode == '00') {
              //thanh cong
              //paymentStatus = '1'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
              return { RspCode: '00', message: 'Success' };
              // res.status(200).json({orderId, orderInfo, RspCode: '00', message: 'Success' });
            } else {
              //that bai
              //paymentStatus = '2'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
              return { RspCode: '01', message: 'Fail' };
              // res.status(200).json({orderId, orderInfo, RspCode: '00', message: 'Success' });
            }
          } else {
            return { RspCode: '00', Message: 'Success' };
          }
        } else {
          return { RspCode: '04', Message: 'Amount invalid' };
        }
      } else {
        return { RspCode: '01', Message: 'Order not found' };
      }
    } else {
      return { RspCode: '97', Message: 'Checksum failed' };
    }
  }

  async queryDr(body: Record<string, any>, ip: string) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const now = DateTime.now().setZone('Asia/Ho_Chi_Minh');

    const vnp_RequestId = now.toFormat('hhmmss');
    const vnp_Version = '2.1.0';
    const vnp_Command = 'querydr';
    const vnp_TxnRef = body.orderId;
    const vnp_TransactionDate = body.transDate;
    const vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;
    const vnp_CreateDate = now.toFormat('yyyyLLddHHmmss');

    const data =
      vnp_RequestId +
      '|' +
      vnp_Version +
      '|' +
      vnp_Command +
      '|' +
      this.tmnCode +
      '|' +
      vnp_TxnRef +
      '|' +
      vnp_TransactionDate +
      '|' +
      vnp_CreateDate +
      '|' +
      ip +
      '|' +
      vnp_OrderInfo;

    const hmac = createHmac('SHA512', this.hashSecret);
    const vnp_SecureHash = hmac
      .update(Buffer.from(data, 'utf-8'))
      .digest('hex');

    // const url = new URL(
    //   'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
    // );

    const dataObj = {
      vnp_RequestId: vnp_RequestId,
      vnp_Version: vnp_Version,
      vnp_Command: vnp_Command,
      vnp_TmnCode: this.tmnCode,
      vnp_TxnRef: vnp_TxnRef,
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_TransactionDate: vnp_TransactionDate,
      vnp_CreateDate: vnp_CreateDate,
      vnp_IpAddr: ip,
      vnp_SecureHash: vnp_SecureHash,
    };
    // const query = new URLSearchParams(dataObj);
    const response = await lastValueFrom(
      this.httpService.post(
        'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
        dataObj,
      ),
    );
    return response.data;
  }
}