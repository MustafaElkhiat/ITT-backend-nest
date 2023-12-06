/**
 * @Project : backend-nest
 * @File : src/users/entities/user.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/17/2023
 * @Time : 11:24 AM
 */
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Role } from './role.enum';
import { EntityAudit } from '../../entity-audit/entities/entity-audit.entity';
import { ObjectId } from 'mongodb';
import { encodePassword } from '../../utilities/bcrypt';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class User extends EntityAudit {
  @ObjectIdColumn()
  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  role: Role;

  @Column({ unique: true })
  email: string;

  @Column()
  branch: string;

  @Column({ default: encodePassword('0000') })
  @Exclude()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: true })
  isEnabled: boolean;
}
