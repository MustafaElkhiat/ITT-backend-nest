import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateCargoDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
  @IsDefined()
  @IsNotEmpty()
  readonly code: string;
}
