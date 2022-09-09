import { Folder } from "./../../entities/folder.entity";
import { v4 as uuidv4 } from 'uuid'


export class CreateFolderAttachmentDto {

    

  uuid!:string;
//   uuid!:typeof uuidv4;

  folder!: number

  fileName?: string;

  filePath!: string;

  courseMaterialId!: number;

  recordStatus: boolean = true;

  createdAt!: Date;

  createdBy!: string;

  updatedAt!: Date;

  deletedAt?: Date;


}
