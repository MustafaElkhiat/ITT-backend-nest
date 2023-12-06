import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { SubCargo } from './entities/subCargo.entity';

@Module({
  controllers: [CargoController],
  providers: [CargoService],
  imports: [
    //MongooseModule.forFeature([{ name: Cargo.name, schema: CargoSchema }]),
    TypeOrmModule.forFeature([Cargo, SubCargo]),
  ],
})
export class CargoModule {}
