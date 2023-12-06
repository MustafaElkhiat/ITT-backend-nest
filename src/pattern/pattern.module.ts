import { Module } from '@nestjs/common';
import { PatternService } from './pattern.service';
import { PatternController } from './pattern.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pattern } from './entities/pattern.entity';

@Module({
  controllers: [PatternController],
  providers: [PatternService],
  imports: [TypeOrmModule.forFeature([Pattern])],
  exports: [PatternService],
})
export class PatternModule {}
