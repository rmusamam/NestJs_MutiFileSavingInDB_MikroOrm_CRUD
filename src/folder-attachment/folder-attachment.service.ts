import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FolderAttachment } from './../entities/folder-attachment.entity';
// import { CreateFolderAttachmentDto } from './dto/create-folder-attachment.dto';
import { UpdateFolderAttachmentDto } from './dto/update-folder-attachment.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateFolderAttachmentDto } from './dto/create-folder-attachment.dto';


@Injectable()
export class FolderAttachmentService {
  constructor(
    @InjectRepository(FolderAttachment)
    private FolderAttachmentRepository: EntityRepository<FolderAttachment>,
  ) {}


  async create(folder_id:number,course_material_id:number,createFolderAttachmentDto: CreateFolderAttachmentDto,files:any) {
    // console.log('hello pakistan',createFolderAttachmentDto);
    var fileName=[]
    var filePath=[]

    // fileName=files.files.map((a)=>  (a.name))
    // console.log(fileName);
    createFolderAttachmentDto.createdAt=new Date()
      createFolderAttachmentDto.updatedAt=new Date()
      createFolderAttachmentDto.uuid= uuidv4()
      createFolderAttachmentDto.recordStatus=true
      createFolderAttachmentDto.deletedAt=null
      createFolderAttachmentDto.courseMaterialId=course_material_id
      createFolderAttachmentDto.folder=folder_id

    filePath=files.files.map( (a)=>  {
            createFolderAttachmentDto.filePath=a.path
            createFolderAttachmentDto.fileName=a.filename
            var folder =  this.FolderAttachmentRepository.create(createFolderAttachmentDto)
            this.FolderAttachmentRepository.persist(folder)
            console.log(folder);
            
    })
    this.FolderAttachmentRepository.flush()



  
    return "ok"
  }

  async findAll() {
    return await this.FolderAttachmentRepository.findAll()
    return `This action returns all folderAttachment`;
  }

    async findOne(id: number) {
      try{
        
      console.log('this is uuid : ', id);
  //search will contain course material and by using this primary key will get attachment
      const search = await this.FolderAttachmentRepository.findOneOrFail({
        id
      });
      console.log(search);
  
      return search;
      }catch{
        throw new HttpException("Access denied",HttpStatus.FORBIDDEN)
      }
    }
  

    async remove(id:number) {
      try{
        
      const findFolder= await this.FolderAttachmentRepository.findOne({
        id
      });
      findFolder.recordStatus = false;
      findFolder.deletedAt = new Date();
      await this.FolderAttachmentRepository.persist(findFolder).flush();
      
    console.log(FolderAttachment)
  
      return `This action updates a #${findFolder.recordStatus} course`;
   
      }
     catch{
      throw new HttpException({
        status:HttpStatus.BAD_REQUEST,
        error:'Access Denied',
      },HttpStatus.BAD_REQUEST);
     }
  }




  async update(id: number, updateFolderAttachmentDto: UpdateFolderAttachmentDto,files) {
    try{
      
      updateFolderAttachmentDto.updatedAt = new Date();
      // console.log(updateFolderAttachmentDto);
      
      // var folder = await this.FolderAttachmentRepository.findOne({
      //   id
      // });
      
      if(files.files.length()==1){
     
        var folder = await this.FolderAttachmentRepository.findOne({
          id
        });
        folder.fileName=files.files.filename
        folder.filePath=files.files.filepath
      }
      else

      folder.filePath=files.files
  
      wrap(folder).assign(updateFolderAttachmentDto);
      // console.log('this is find Query :', folder);
  
      await this.FolderAttachmentRepository.persist(folder).flush();
  
      return `This action updates a #${folder} course`;
  
    }catch{
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a incorrect attempt to access data',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    }







  }

 

