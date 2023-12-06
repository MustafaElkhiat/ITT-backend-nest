import { IMEX } from '../../booking/entities/imex.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePatternDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly code: string;
  @IsNotEmpty()
  @IsEnum(IMEX)
  readonly imex: IMEX;
}
