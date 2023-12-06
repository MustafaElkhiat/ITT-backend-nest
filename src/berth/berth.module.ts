import { Module } from '@nestjs/common';
import { BerthService } from './berth.service';
import { BerthController } from './berth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Berth } from './entities/berth.entity';

@Module({
  controllers: [BerthController],
  imports: [TypeOrmModule.forFeature([Berth])],
  providers: [BerthService],
  exports: [BerthService],
})
export class BerthModule {}
