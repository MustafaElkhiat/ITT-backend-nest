import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VesselService } from './vessel.service';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { UpdateVesselDto } from './dto/update-vessel.dto';

@Controller('vessel')
export class VesselController {
  constructor(private readonly vesselService: VesselService) {}

  @Post()
  create(@Body() createVesselDto: CreateVesselDto) {
    return this.vesselService.create(createVesselDto);
  }

  @Get()
  findAll() {
    return this.vesselService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vesselService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVesselDto: UpdateVesselDto) {
    return this.vesselService.update(+id, updateVesselDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vesselService.remove(+id);
  }
}
