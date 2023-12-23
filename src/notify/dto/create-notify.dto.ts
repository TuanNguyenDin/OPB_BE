import { ApiProperty } from "@nestjs/swagger";

export class CreateNotifyDto {
    @ApiProperty({example:'The title of the notify', description: 'The title of the notify'})
    title: string;
    @ApiProperty({example:'The content of the notify', description: 'The content of the notify'})
    content: string;
    @ApiProperty({example: 'fales', description: 'The status of the notify: true is read, false is unread'})
    isRead: boolean;//Status true là đã đọc, false là chưa đọc
    @ApiProperty({example: '1', description: 'The id of the who created this notify'})
    created_by: string;//người gửi 
    @ApiProperty({example: '1', description: 'The id of the who take this notify'})
    send_to: string;//người nhận
}
