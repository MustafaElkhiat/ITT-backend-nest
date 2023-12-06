import { TruckTypeEnum } from './TruckType.enum';
import { TruckStatusEnum } from './TruckStatus.enum';
import { Column } from 'typeorm';

/**
 * @Project : backend-nest
 * @File : truck.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/19/2023
 * @Time : 12:48 PM
 */
export class Truck {
  @Column()
  number: string;
  @Column()
  truckLicense: string;
  @Column()
  truckType: TruckTypeEnum;
  @Column()
  truckStatus: TruckStatusEnum;
}
