/**
 * @Project : backend-nest
 * @File : create-booking-pattern.dto.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/26/2023
 * @Time : 10:36 AM
 */
import { AccessRight } from '../entities/access-right.entity';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingPattern } from '../entities/booking-pattern.entity';

export class CreateBookingPatternDto {
  @IsNotEmpty()
  readonly pattern: BookingPattern;
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccessRight)
  accessRightList: AccessRight[];
}
