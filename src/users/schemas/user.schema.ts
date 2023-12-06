import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../entities/role.enum';
import { EntityAudit } from '../../entity-audit/entities/entity-audit.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User extends EntityAudit {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  role: Role;

  @Prop({ unique: true })
  email: string;

  @Prop()
  branch: string;

  @Prop()
  password: string;

  @Prop()
  isActive: boolean;

  @Prop()
  isEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
