import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Folder } from './folder.entity';
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class FolderAttachment {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'uuid' })
  uuid!: string;

  @ManyToOne({ entity: () => Folder })
  folder!: number;

  @Property({ columnType: 'text', nullable: true })
  fileName?: string;

  @Property({ columnType: 'text' })
  filePath!: string;

  @Property()
  courseMaterialId!: number;

  @Property({ default: true })
  recordStatus: boolean = true;

  @Property({ columnType: 'date' })
  createdAt!: Date;

  @Property({ columnType: 'text' })
  createdBy!: string;

  @Property({ columnType: 'date' })
  updatedAt!: Date;

  @Property({ columnType: 'date', nullable: true })
  deletedAt?: Date;

}
