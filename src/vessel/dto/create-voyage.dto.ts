/**
 * @Project : backend-nest
 * @File : create-voyage.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/18/2023
 * @Time : 3:40 PM
 */
import { IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateVoyageDto {
  @ValidateIf((o) => !o.eta?.length && !o.arrivalTime?.length)
  @IsNotEmpty()
  arrivalTime: string;
  departureTime: string;
  @ValidateIf((o) => !o.eta?.length && !o.arrivalTime?.length)
  @IsNotEmpty()
  eta: string;
  etd: string;
}
