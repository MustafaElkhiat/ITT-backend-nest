import { ObjectId } from 'mongodb';
import { Driver } from './driver.entity';
import { Truck } from './truck.entity';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Contractor {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  name: string;
  @Column({ unique: true })
  code: string;
  @Column()
  driverList: Driver[];
  @Column()
  truckList: Truck[];
}
