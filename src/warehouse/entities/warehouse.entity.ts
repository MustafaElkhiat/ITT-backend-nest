import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { Geo } from '../../geo/enitities/geo.interface';
import { ObjectId } from 'mongodb';
import { LocationTypeEnum } from '../../geo/enitities/location-type.enum';
import { LocationType } from '../../geo/enitities/location-type.interface';

@Entity()
@Index(['lat', 'long'], { unique: true })
export class Warehouse implements Geo, LocationType {
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
