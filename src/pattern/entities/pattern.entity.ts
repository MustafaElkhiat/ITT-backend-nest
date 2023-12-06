import { IMEX } from '../../booking/entities/imex.enum';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CheckPoint } from './check-point.entity';

@Entity()
export class Pattern {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  name: string;
  @Column({ unique: true })
  code: string;
  @Column()
  imex: IMEX;
  @Column()
  checkPointList: CheckPoint[];
}
