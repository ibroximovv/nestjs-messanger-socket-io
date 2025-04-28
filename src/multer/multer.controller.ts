import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('file')
export class MulterController {
    @UseGuards(AuthorizationGuard)
    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                callback(null, `${Math.random()}-${file.originalname}`)
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {url: file.filename}
    }
}