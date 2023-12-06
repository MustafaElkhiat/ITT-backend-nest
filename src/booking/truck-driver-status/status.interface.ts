/**
 * @Project : backend-nest
 * @File : status.interface.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/25/2023
 * @Time : 3:26 PM
 */
import { TruckDriver } from '../entities/truck-driver.entity';

export interface TruckDriverStatusInterface {
  changeTruckDriverStatus(): TruckDriver;

  changeDriverStatus(): Promise<void>;

  changeTruckStatus(): Promise<void>;
}
