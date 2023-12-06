/**
 * @Project : backend-nest
 * @File : create-driver.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/19/2023
 * @Time : 2:15 PM
 */
import { IsDefined, IsNotEmpty } from 'class-validator';
import { DriverStatusEnum } from '../entities/DriverStatus.enum';

export class CreateDriverDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
  @IsDefined()
  @IsNotEmpty()
  readonly drivingLicense: string;
  @IsDefined()
  @IsNotEmpty()
  readonly nationalID: string;
  readonly driverStatus: DriverStatusEnum = DriverStatusEnum.AVAILABLE;
}
