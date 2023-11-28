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
    }
  }
  