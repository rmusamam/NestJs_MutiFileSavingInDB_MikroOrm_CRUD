import { PartialType } from '@nestjs/mapped-types';
import { CreateFolderAttachmentDto } from './create-folder-attachment.dto';

export class UpdateFolderAttachmentDto extends PartialType(CreateFolderAttachmentDto) {}
