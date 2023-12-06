import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Voyage } from '../../vessel/entities/voyage.entity';
import { SubCargo } from '../../cargo/entities/subCargo.entity';
import { BookingVessel } from './booking-vessel.entity';
import { BookingCargo } from './booking-cargo.entity';
import { IMEX } from './imex.enum';
import { BookingStatus } from './booking-status.enum';
import { TruckDriver } from './truck-driver.entity';
import { EntityAudit } from '../../entity-audit/entities/entity-audit.entity';
import { AccessRight } from './access-right.entity';
import { BookingPattern } from './booking-pattern.entity';

@Entity()
export class Booking extends EntityAudit {
  @ObjectIdColumn()
  _id?: ObjectId;
  @Column({ unique: true })
  bookingNumber: string;
  @Column({ unique: true })
  workOrderNumber: string;
  @Column()
  vessel: BookingVessel;
  @Column()
  voyage: Voyage;
  @Column()
  cargo: BookingCargo;
  @Column()
  subCargo: SubCargo;
  @Column()
  imex: IMEX;
  @Column()
  openedAt: string;
  @Column()
  closedAt?: string;
  @Column()
  bookingStatus: BookingStatus;
  @Column()
  pattern: BookingPattern;
  @Column()
  accessRightList: AccessRight[];
  @Column()
  truckDriverList: TruckDriver[];
}
