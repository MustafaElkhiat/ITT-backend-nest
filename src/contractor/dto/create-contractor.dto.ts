import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateContractorDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
  @IsDefined()
  @IsNotEmpty()
  readonly code: string;
}
