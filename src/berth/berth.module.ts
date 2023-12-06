import { Module } from '@nestjs/common';
import { BerthService } from './berth.service';
import { BerthController } from './berth.controller';

@Module({
  controllers: [BerthController],
  providers: [BerthService],
})
export class BerthModule {}
