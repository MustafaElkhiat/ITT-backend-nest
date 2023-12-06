import { OmitType } from '@nestjs/mapped-types';
import { Pattern } from '../../pattern/entities/pattern.entity';

/**
 * @Project : backend-nest
 * @File : booking-pattern.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/26/2023
 * @Time : 12:42 PM
 */
export class BookingPattern extends OmitType(Pattern, [
  'checkPointList',
] as const) {}
