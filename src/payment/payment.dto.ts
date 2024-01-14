import { ApiProperty } from "@nestjs/swagger";

export class paymentDTO {
  amount: number;
  order_id: string;
  method: string;
  content: string;
  status: string;
  reference_transaction_id: string;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  vnp_SecureHash: string;

  constructor(data: {
    amount: number;
    order_id: string;
    method: string;
    content: string;
    status: string;
    reference_transaction_id: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    vnp_SecureHash: string;
  }) {
    // Khởi tạo các thuộc tính từ tham số truyền vào
    this.amount = data.amount;
    this.order_id = data.order_id;
    this.method = data.method;
    this.content = data.content;
    this.status = data.status;
    this.reference_transaction_id = data.reference_transaction_id;
    this.created_at = data.created_at;
    this.created_by = data.created_by;
    this.updated_at = data.updated_at;
    this.updated_by = data.updated_by;
    this.vnp_SecureHash = data.vnp_SecureHash;
  }
}
export class paymentCardDTO {
  @ApiProperty({example:"9704198526191432198", description:"Card number"})
  number: string;
  @ApiProperty({example:"NGUYEN VAN A", description:"Card holder"})
  holder: string;
  @ApiProperty({example:"07/15", description:"Expiration date"})
  expiration: string;
  @ApiProperty({example:"https://img.icons8.com/color/70/000000/visa.png", description:"Card logo image"})
  logo: string;
}
