/**
 * @Project : backend-nest
 * @File : trip-check-point.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/30/2023
 * @Time : 1:23 PM
 */
import { Column } from 'typeorm';
import { CheckPoint } from '../../pattern/entities/check-point.entity';

export class TripCheckPoint {
  @Column()
  checkPoint: CheckPoint;
  @Column()
  time: string;
  @Column()
  duration?: number;
  @Column()
  remarks?: string;
  @Column()
  createdBy?: string;
}
