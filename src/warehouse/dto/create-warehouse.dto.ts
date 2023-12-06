import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWarehouseDto {
  @IsNumber()
  readonly lat: number;
  @IsNumber()
  readonly long: number;
  @IsNotEmpty()
  readonly number: string;
  @IsNotEmpty()
  readonly code: string;
  @IsNotEmpty()
  readonly branch: string;
}
