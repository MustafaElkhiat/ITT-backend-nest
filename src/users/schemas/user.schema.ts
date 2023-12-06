import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.enum';
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
  active: boolean;

  @Prop()
  enabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
