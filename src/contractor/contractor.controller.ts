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
import { ContractorService } from './contractor.service';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';
import { ObjectId } from 'mongodb';
import { CreateTruckDto } from './dto/create-truck.dto';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller('api/contractor')
//@UsePipes(TrimPipe)
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body(new ValidationPipe()) createContractorDto: CreateContractorDto) {
    return this.contractorService.create(createContractorDto);
  }

  @Get()
  findAll() {
    return this.contractorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.contractorService.findContractor(id);
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.contractorService.findContractorByCode(code);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body(new ValidationPipe()) updateContractorDto: UpdateContractorDto,
  ) {
    return this.contractorService.editContractor(id, updateContractorDto);
  }

  @Post(':code/truck')
  addTruckToContractor(
    @Param('code') code: string,
    @Body(new ValidationPipe()) createTruckDto: CreateTruckDto,
  ) {
    return this.contractorService.addTruckToContractor(code, createTruckDto);
  }

  @Post(':code/driver')
  addDriverToContractor(
    @Param('code') code: string,
    @Body(new ValidationPipe()) createDriverDto: CreateDriverDto,
  ) {
    return this.contractorService.addDriverToContractor(code, createDriverDto);
  }
}
