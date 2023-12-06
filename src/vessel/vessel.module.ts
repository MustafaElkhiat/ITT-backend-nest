import { Module } from '@nestjs/common';
import { VesselService } from './vessel.service';
import { VesselController } from './vessel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voyage } from './entities/voyage.entity';
import { Vessel } from './entities/vessel.entity';

@Module({
  controllers: [VesselController],
  providers: [VesselService],
  imports: [TypeOrmModule.forFeature([Vessel, Voyage])],
  exports: [VesselService],
})
export class VesselModule {}
