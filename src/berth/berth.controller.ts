import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BerthService } from './berth.service';
import { CreateBerthDto } from './dto/create-berth.dto';
import { UpdateBerthDto } from './dto/update-berth.dto';

@Controller('berth')
export class BerthController {
  constructor(private readonly berthService: BerthService) {}

  @Post()
  create(@Body() createBerthDto: CreateBerthDto) {
    return this.berthService.create(createBerthDto);
  }

  @Get()
  findAll() {
    return this.berthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.berthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBerthDto: UpdateBerthDto) {
    return this.berthService.update(+id, updateBerthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.berthService.remove(+id);
  }
}
