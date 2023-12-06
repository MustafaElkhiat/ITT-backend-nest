/**
 * @Project : backend-nest
 * @File : booking-contractor.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/23/2023
 * @Time : 10:01 AM
 */
import { OmitType } from '@nestjs/mapped-types';
import { Contractor } from '../../contractor/entities/contractor.entity';

export class BookingContractor extends OmitType(Contractor, [
  'driverList',
  'truckList',
] as const) {}
