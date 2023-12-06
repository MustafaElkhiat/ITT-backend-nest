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
import { WarehouseService } from './warehouse.service';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Controller('api/warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body(new ValidationPipe()) createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get('byBranch/:branch')
  findAllByBranch(@Param('branch') branch: string) {
    console.log(branch);
    return this.warehouseService.findAllByBranch(branch);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.warehouseService.findOne(id);
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.warehouseService.findOneByCode(code);
  }

  @Get('number/:number')
  findOneByNumber(@Param('number') number: string) {
    return this.warehouseService.findOneByNumber(number);
  }

  @Put(':id')
  @UseFilters(MongoExceptionFilter)
  update(
    @Param('id', ParseObjectIdPipe) _id: ObjectId,
    @Body(new ValidationPipe()) updateWarehouseDto: UpdateWarehouseDto,
  ) {
    console.log(_id);
    return this.warehouseService.update(_id, updateWarehouseDto);
  }
}
