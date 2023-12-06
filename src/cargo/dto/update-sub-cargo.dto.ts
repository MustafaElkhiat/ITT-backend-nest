/**
 * @Project : backend-nest
 * @File : src/cargo/dto/create-sub-cargo.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/17/2023
 * @Time : 4:07 PM
 */
import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateSubCargoDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  code: string;
}
