import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FolderAttachmentService } from './folder-attachment.service';
import { CreateFolderAttachmentDto } from './dto/create-folder-attachment.dto';
import { UpdateFolderAttachmentDto } from './dto/update-folder-attachment.dto';

import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('folder-attachment')
export class FolderAttachmentController {
  constructor(
    private readonly folderAttachmentService: FolderAttachmentService,
  ) {}

  @Post(':f_id/:c_id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 3 }], {
      storage: diskStorage({
        destination: './assests/folderAttachment',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '');
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  // uploadFile(
  //   @UploadedFiles()
  //   files: 
  //     any,@Param('f_id') folder_id:number,@Param('c_id')course_material_id:number,@Body() createFolderAttachmentDto: CreateFolderAttachmentDto
    
  // ) {
  //   console.log('hello files',  files?.files);
   
  // }

  create(@UploadedFiles() files:any,@Param('f_id') folder_id:number,@Param('c_id')course_material_id:number,@Body() createFolderAttachmentDto: CreateFolderAttachmentDto) {
    console.log('hello pakistan',files.files);
    return this.folderAttachmentService.create(folder_id,course_material_id,createFolderAttachmentDto,files);
  }

  @Get()
  findAll() {
    return this.folderAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderAttachmentService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 3 }], {
      storage: diskStorage({
        destination: './assests/folderAttachment',
        filename: (req, file, callBack) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '');
          const extension = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateFolderAttachmentDto: UpdateFolderAttachmentDto,@UploadedFiles() files:any
  ) {
    return this.folderAttachmentService.update(+id, updateFolderAttachmentDto,files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderAttachmentService.remove(+id);
  }
}
