/**
 * @Project : backend-nest
 * @File : create-trip-check-point.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/27/2023
 * @Time : 4:23 PM
 */
import { IsNumber } from 'class-validator';

export class CreateTripCheckPointDto {
  @IsNumber()
  readonly truckDriverId: number;
  @IsNumber()
  readonly lat: number;
  @IsNumber()
  readonly long: number;
  readonly createdBy: string;
}
