import { IsNotEmpty, IsNumber } from 'class-validator';

/**
 * @Project : backend-nest
 * @File : return-truck-driver.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/30/2023
 * @Time : 12:46 PM
 */
export class ReturnTruckDriverDto {
  @IsNotEmpty()
  @IsNumber()
  readonly truckDriverId: number;
}
