/**
 * @Project : backend-nest
 * @File : create-check-point.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/20/2023
 * @Time : 10:03 AM
 */
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Role } from '../../users/entities/role.enum';
import { LocationTypeEnum } from '../../geo/enitities/location-type.enum';
import { RepeatEnum } from '../entities/repeat.enum';

export class CreateCheckPointDto {
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
  @IsNotEmpty()
  readonly label: string;
  @IsNotEmpty()
  readonly description: string;
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
  @IsNotEmpty()
  @IsEnum(LocationTypeEnum)
  readonly locationType: LocationTypeEnum;
  @IsNotEmpty()
  @IsEnum(RepeatEnum)
  readonly repeat: RepeatEnum;
}
