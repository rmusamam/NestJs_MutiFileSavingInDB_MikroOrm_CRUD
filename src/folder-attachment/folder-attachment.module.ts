import { Module } from '@nestjs/common';
import { FolderAttachmentService } from './folder-attachment.service';
import { FolderAttachmentController } from './folder-attachment.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FolderAttachment } from './../entities/folder-attachment.entity';

@Module({
  imports:[MikroOrmModule.forFeature([FolderAttachment])],
  controllers: [FolderAttachmentController],
  providers: [FolderAttachmentService]
})
export class FolderAttachmentModule {}
