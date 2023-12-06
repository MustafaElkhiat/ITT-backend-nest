/**
 * @Project : backend-nest
 * @File : booking-vessel.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/23/2023
 * @Time : 9:53 AM
 */
import { OmitType } from '@nestjs/mapped-types';
import { Vessel } from '../../vessel/entities/vessel.entity';

export class BookingVessel extends OmitType(Vessel, ['voyageList'] as const) {}
