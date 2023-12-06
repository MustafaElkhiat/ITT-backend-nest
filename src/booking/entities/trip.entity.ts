/**
 * @Project : backend-nest
 * @File : trip.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/30/2023
 * @Time : 1:21 PM
 */
import { TripCheckPoint } from './trip-check-point.entity';
import { Column } from 'typeorm';

export class Trip {
  @Column()
  isOpened: boolean;
  @Column()
  openedAt: string;
  @Column()
  closedAt?: string;
  @Column()
  tripCheckPointList: TripCheckPoint[];
}
