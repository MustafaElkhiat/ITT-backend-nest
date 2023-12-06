/**
 * @Project : backend-nest
 * @File : check-point.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/19/2023
 * @Time : 2:13 PM
 */
import { Role } from '../../users/entities/role.enum';
import { Column } from 'typeorm';
import { LocationTypeEnum } from '../../geo/enitities/location-type.enum';
import { ObjectId } from 'mongodb';
import { RepeatEnum } from './repeat.enum';

export class CheckPoint {
  @Column()
  id: ObjectId;
  @Column()
  order: number;
  @Column()
  label: string;
  @Column()
  description: string;
  @Column()
  role: Role;
  @Column()
  locationType: LocationTypeEnum;
  @Column()
  repeat: RepeatEnum;
}
