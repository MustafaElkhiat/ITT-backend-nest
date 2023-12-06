/**
 * @Project : backend-nest
 * @File : src/cargo/entities/cargo.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/17/2023
 * @Time : 11:47 AM
 */

import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { EntityAudit } from '../../entity-audit/entities/entity-audit.entity';

import { ObjectId } from 'mongodb';
import { SubCargo } from './subCargo.entity';

@Entity()
export class Cargo extends EntityAudit {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  subCargoList: SubCargo[];
}
