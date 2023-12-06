/**
 * @Project : backend-nest
 * @File : truck-driver.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/23/2023
 * @Time : 9:58 AM
 */
import { Truck } from '../../contractor/entities/truck.entity';
import { Driver } from '../../contractor/entities/driver.entity';
import { BookingContractor } from './booking-contractor.entity';
import { TruckDriverStatusEnum } from './truck-driver-status.enum';
import { Column } from 'typeorm';
import { TruckDriverStatusDetail } from './truck-driver-status-detail.entity';
import { Trip } from './trip.entity';

export class TruckDriver {
  @Column()
  id: number;
  @Column()
  truck: Truck;
  @Column()
  driver: Driver;
  @Column()
  contractor: BookingContractor;
  @Column()
  truckDriverStatus?: TruckDriverStatusEnum;
  @Column()
  truckDriverStatusDetails: TruckDriverStatusDetail[];
  @Column()
  tripList: Trip[] = [];
}
