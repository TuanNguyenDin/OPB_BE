import { Body, Controller, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AuthService, FirebaseService } from './auth.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('common')
@ApiTags('Auth')
export class AuthController {
    //Controller quy định các router nào sẽ sử dụng chức năng nào nằm trong service, cũng như là dữ liệu nào được truyền vào và sử dụng
    constructor(
        private readonly authService: AuthService,
        private readonly firebaseService: FirebaseService
    ) { }
    @Post('signup')
    async signUp(
        @Body() { email, password }: CreateAccountDto
    ) {
        return await this.authService.register({ email: email, password: password })
    }
    @Post('signin')
    async signIn(
        @Body() data: CreateAccountDto
    ) {
        return await this.authService.login(data);
    }


    @Post('single/:folder')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        description: 'File upload',
        type: 'file', // Xác định loại dữ liệu của trường
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'file',
                    description: 'The file to upload',
                },
            },
        },
    })
    async uploadFile(
        @Param('folder') folder: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        console.log(`Uploaded file to folder ${folder}:`, file);
        return await this.firebaseService.uploadFile(folder, file);
    }

    @Post('multi/:id')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        description: 'File upload',
        type: 'file', // Xác định loại dữ liệu của trường
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'file',
                    description: 'The file to upload',
                },
            },
        },
    })
    async uploadMultiImage(
        @Param('id') id: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        // Xử lý việc tải lên nhiều tệp ở đây
        console.log(`Uploaded ${files.length} files for ID ${id}:`, files);
        return await this.firebaseService.uploadMultiImage(files, id);
    }
}
