import { IsNotEmpty, ValidateIf } from 'class-validator';

/**
 * @Project : backend-nest
 * @File : voyage.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/19/2023
 * @Time : 11:15 AM
 */
export class VoyageDto {
  readonly id: number;
  @ValidateIf((o) => !o.eta?.length && !o.arrivalTime?.length)
  @IsNotEmpty()
  readonly arrivalTime: string;
  readonly departureTime: string;
  @ValidateIf((o) => !o.eta?.length && !o.arrivalTime?.length)
  @IsNotEmpty()
  readonly eta: string;
  readonly etd: string;
}
