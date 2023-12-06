import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Voyage } from './voyage.entity';

@Entity()
export class Vessel {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  name: string;
  @Column({ unique: true })
  imo: string;
  @Column()
  grossTonnage: number;
  @Column()
  voyageList: Voyage[];
}
