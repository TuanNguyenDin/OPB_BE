import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class demoCreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'amount', example: '10000' })
  amount: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'bankcode', example: 'NCB' })
  bankcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'language', example: 'vn' })
  language: string;
}
export class QueryDrDto {
  @ApiProperty({
    description: 'Mã giao dịch (vnp_TxnRef)',
    example: 'yourTxnRefValue',
  })
  @Transform(value => value.toString())
  orderId: string;

  @ApiProperty({
    description: 'Thời gian tạo giao dịch (vnp_TransactionDate) đã được URL-encode',
    example: '27%2F11%2F2023+11%3A19%3A54',
  })
  transDate: Date;
}
