/**
 * @Project : backend-nest
 * @File : truck-driver-status-detail.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/25/2023
 * @Time : 3:00 PM
 */
import { TruckDriverStatusEnum } from './truck-driver-status.enum';
import { Column } from 'typeorm';
import { ReleaseTypeEnum } from './release-type.enum';

export class TruckDriverStatusDetail {
  @Column()
  truckDriverStatus: TruckDriverStatusEnum;
  @Column()
  time: string;
  @Column()
  releaseType?: ReleaseTypeEnum;
  @Column()
  releaseReason?: string;
}
