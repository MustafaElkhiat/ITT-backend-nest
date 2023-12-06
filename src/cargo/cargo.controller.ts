import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';
import { ObjectId } from 'mongodb';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { SubCargoDto } from './dto/sub-cargo.dto';

@Controller('api/cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  //@UseInterceptors(CreateEntityAuditInterceptor)
  createCargo(@Body(new ValidationPipe()) createCargoDto: CreateCargoDto) {
    return this.cargoService.addCargo(createCargoDto);
  }

  @Post(':code/subCargo')
  @UseFilters(MongoExceptionFilter)
  createSubCargo(
    @Param('code') cargoCode: string,
    @Body(new ValidationPipe()) subCargo: CreateCargoDto,
  ) {
    return this.cargoService.addSubCargo(cargoCode, subCargo);
  }

  @Get()
  findAll() {
    return this.cargoService.findAllCargo();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return await this.cargoService.findCargo(id);
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.cargoService.findCargoByCode(code);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() updateCargoDto: UpdateCargoDto,
  ) {
    return this.cargoService.editCargo(id, updateCargoDto);
  }

  @Put(':code/subCargo')
  updateSubCargo(
    @Param('code') cargoCode: string,
    @Body(new ValidationPipe()) subCargoDto: SubCargoDto,
  ) {
    return this.cargoService.editSubCargo(cargoCode, subCargoDto);
  }
}
