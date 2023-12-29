import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AuthService, FirebaseService } from './auth.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('common')
export class AuthController {
    //Controller quy định các router nào sẽ sử dụng chức năng nào nằm trong service, cũng như là dữ liệu nào được truyền vào và sử dụng
    constructor(
        private readonly authService: AuthService,
        private readonly firebaseService: FirebaseService
    ) { }
    @Post('signup')
    @HttpCode(200)
    @ApiTags('Auth')
    @ApiOperation({ summary: 'user signup' })
    async signUp(
        @Body() data: CreateAccountDto
    ) {
        return await this.authService.register(data)
    }
    @Post('signin')
    @HttpCode(200)
    @ApiTags('Auth')
    @ApiOperation({ summary: 'user signin' })
    async signIn(
        @Body() data: CreateAccountDto
    ) {
        return await this.authService.login(data);
    }

    @Post('password/reset/:id')
    @HttpCode(200)
    @ApiTags('Auth')
    @ApiOperation({ summary: 'user password reset' })
    async resetPassword(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
        return await this.authService.updatePassword(id, data.oldPassword, data.newPassword);
    }


    @Post('single/:folder')
    @ApiTags('Auth')
    @ApiOperation({ summary: 'Upload single file' })
    @ApiConsumes('multipart/form-data') 
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

    @ApiTags('Auth')
    @Post('multi/:id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Upload multiple files' })
    @UseInterceptors(FileInterceptor('files'))
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

    @Get('user')
    @HttpCode(200)
    @ApiTags('User')
    @ApiOperation({ summary: 'Get all users' })
    async getUserAll() { return await this.authService.findAll() }

    @Get('user/:id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get user by id' })
    @ApiTags('User')
    async getUser(@Param('id') id: string) { return await this.authService.findUser(id) }

    @Patch('user/:id')
    @HttpCode(200)
    @ApiTags('User')
    @ApiOperation({ summary: 'Update user by id' })
    async updateUser(@Param('id') id: string, @Body() data: CreateAccountDto) { return await this.authService.updateUser(id, data) }

    @Delete('user/:id')
    @HttpCode(200)
    @ApiTags('User')
    @ApiOperation({ summary: 'Delete user by id' })
    async deleteUser(@Param('id') id: string) { return await this.authService.deleteUser(id) }

    @Post('/verify/:phone')
    @ApiTags('User')
    async verifyPhone(@Param('phone') phone: string, @Body() code: string) {
        
    }
}
