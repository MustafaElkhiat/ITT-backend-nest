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
import { VesselService } from './vessel.service';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { UpdateVesselDto } from './dto/update-vessel.dto';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';
import { CreateVoyageDto } from './dto/create-voyage.dto';
import { VoyageDto } from './dto/voyage.dto';

@Controller('api/vessel')
export class VesselController {
  constructor(private readonly vesselService: VesselService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body(new ValidationPipe()) createVesselDto: CreateVesselDto) {
    return this.vesselService.create(createVesselDto);
  }

  @Post(':imo/voyage')
  addVoyage(
    @Param('imo') imo: string,
    @Body(new ValidationPipe()) createVoyageDto: CreateVoyageDto,
  ) {
    return this.vesselService.addVoyage(imo, createVoyageDto);
  }

  @Get()
  findAll() {
    return this.vesselService.findAll();
  }

  @Get('opened')
  findAllOpenedVessels() {
    return this.vesselService.findOpenedVessels();
  }

  @Get(':id')
  findVessel(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.vesselService.findVessel(id);
  }

  @Get('imo/:imo')
  findVesselByImo(@Param('imo') imo: string) {
    return this.vesselService.findVesselByIMO(imo);
  }

  @Put(':id')
  updateVessel(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body(new ValidationPipe()) updateVesselDto: UpdateVesselDto,
  ) {
    return this.vesselService.updateVessel(id, updateVesselDto);
  }

  @Put(':imo/voyage')
  updateVoyage(
    @Param('imo') imo: string,
    @Body(new ValidationPipe()) updateVoyageDto: VoyageDto,
  ) {
    return this.vesselService.updateVoyage(imo, updateVoyageDto);
  }
}
