/**
 * @Project : backend-nest
 * @File : driver.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/19/2023
 * @Time : 12:47 PM
 */
import { DriverStatusEnum } from './DriverStatus.enum';
import { Column } from 'typeorm';

export class Driver {
  @Column()
  name: string;
  @Column()
  drivingLicense: string;
  @Column()
  nationalID: string;
  @Column()
  driverStatus: DriverStatusEnum;
}
