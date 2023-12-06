/**
 * @Project : backend-nest
 * @File : create-truck.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/19/2023
 * @Time : 1:31 PM
 */
import { TruckTypeEnum } from '../entities/TruckType.enum';
import { TruckStatusEnum } from '../entities/TruckStatus.enum';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTruckDto {
  @IsDefined()
  @IsNotEmpty()
  readonly number: string;
  @IsDefined()
  @IsNotEmpty()
  readonly truckLicense: string;
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(TruckTypeEnum)
  readonly truckType: TruckTypeEnum;
  readonly truckStatus: TruckStatusEnum = TruckStatusEnum.AVAILABLE;
}
