import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVesselDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
  @IsDefined()
  @IsNotEmpty()
  readonly imo: string;
  @IsDefined()
  @IsNumber()
  readonly grossTonnage: number;
}
