/**
 * @Project : backend-nest
 * @File : release-truck-driver.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/26/2023
 * @Time : 10:59 AM
 */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReleaseTruckDriverDto {
  @IsNotEmpty()
  @IsNumber()
  readonly truckDriverId: number;
  @IsString()
  @IsNotEmpty()
  readonly reason: string;
}
