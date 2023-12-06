/**
 * @Project : backend-nest
 * @File : src/cargo/dto/sub-cargo.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/18/2023
 * @Time : 10:48 AM
 */
import { IsDefined, IsNotEmpty } from 'class-validator';

export class SubCargoDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  code: string;
}
