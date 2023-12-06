/**
 * @Project : backend-nest
 * @File : create-truck-driver.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/24/2023
 * @Time : 1:41 PM
 */
import { Truck } from '../../contractor/entities/truck.entity';
import { Driver } from '../../contractor/entities/driver.entity';
import { BookingContractor } from '../entities/booking-contractor.entity';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTruckDriverDto {
  @ValidateNested({ each: true })
  @Type(() => Truck)
  readonly truck: Truck;

  @ValidateNested({ each: true })
  @Type(() => Driver)
  readonly driver: Driver;

  @ValidateNested({ each: true })
  @Type(() => BookingContractor)
  readonly contractor: BookingContractor;
}
