/**
 * @Project : backend-nest
 * @File : booking-cargo.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/23/2023
 * @Time : 9:55 AM
 */
import { OmitType } from '@nestjs/mapped-types';
import { Cargo } from '../../cargo/entities/cargo.entity';

export class BookingCargo extends OmitType(Cargo, ['subCargoList'] as const) {}
