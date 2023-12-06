import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { VesselModule } from '../vessel/vessel.module';
import { ContractorModule } from '../contractor/contractor.module';
import { Working } from './truck-driver-status/working';
import { PatternModule } from '../pattern/pattern.module';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { BerthModule } from '../berth/berth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService, Working],
  imports: [
    TypeOrmModule.forFeature([Booking]),
    VesselModule,
    ContractorModule,
    PatternModule,
    WarehouseModule,
    BerthModule,
    UsersModule,
  ],
})
export class BookingModule {}
