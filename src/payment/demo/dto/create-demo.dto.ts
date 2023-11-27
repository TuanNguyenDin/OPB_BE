import { ApiProperty } from '@nestjs/swagger';
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
