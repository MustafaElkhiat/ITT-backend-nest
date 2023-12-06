import { Geo } from '../../geo/enitities/geo.interface';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { LocationType } from '../../geo/enitities/location-type.interface';
import { LocationTypeEnum } from '../../geo/enitities/location-type.enum';

@Entity()
@Index(['lat', 'long'], { unique: true })
export class Berth implements Geo, LocationType {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  lat: number;
  @Column()
  long: number;
  @Column({ unique: true })
  number: string;
  @Column({ unique: true })
  code: string;
  @Column()
  branch: string;
  @Column()
  locationType: LocationTypeEnum;
}
