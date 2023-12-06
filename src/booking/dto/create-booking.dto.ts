import { BookingVessel } from '../entities/booking-vessel.entity';
import { BookingCargo } from '../entities/booking-cargo.entity';
import { SubCargo } from '../../cargo/entities/subCargo.entity';
import { IMEX } from '../entities/imex.enum';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsDefined()
  @IsNotEmpty()
  readonly bookingNumber: string;
  @IsDefined()
  @IsNotEmpty()
  readonly workOrderNumber: string;
  @IsDefined()
  @IsNotEmpty()
  readonly vessel: BookingVessel;
  @IsDefined()
  @IsNotEmpty()
  readonly cargo: BookingCargo;
  @IsDefined()
  @IsNotEmpty()
  readonly subCargo: SubCargo;
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(IMEX)
  readonly imex: IMEX;
}
