import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Course {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'uuid' })
  uuid!: string;

  @Property({ columnType: 'text' })
  courseName!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @Property({ columnType: 'date' })
  startingDate!: string;

  @Property({ columnType: 'date' })
  endingDate!: string;

  @Property({ default: true })
  recordStatus: boolean = true;

  @Property({ columnType: 'date' })
  createdAt!: string;

  @Property({ columnType: 'text' })
  createdBy!: string;

  @Property({ columnType: 'date' })
  updatedAt!: string;

  @Property({ columnType: 'date', nullable: true })
  deletedAt?: string;

}
