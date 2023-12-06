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
import { BerthService } from './berth.service';
import { CreateBerthDto } from './dto/create-berth.dto';
import { UpdateBerthDto } from './dto/update-berth.dto';
import { ObjectId } from 'mongodb';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';

@Controller('api/berth')
export class BerthController {
  constructor(private readonly berthService: BerthService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body(new ValidationPipe()) createBerthDto: CreateBerthDto) {
    return this.berthService.create(createBerthDto);
  }

  @Get()
  findAll() {
    return this.berthService.findAll();
  }

  @Get('byBranch/:branch')
  findAllByBranch(@Param('branch') branch: string) {
    console.log(branch);
    return this.berthService.findAllByBranch(branch);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.berthService.findOne(id);
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.berthService.findOneByCode(code);
  }

  @Get('number/:number')
  findOneByNumber(@Param('number') number: string) {
    return this.berthService.findOneByNumber(number);
  }

  @Put(':id')
  @UseFilters(MongoExceptionFilter)
  update(
    @Param('id', ParseObjectIdPipe) _id: ObjectId,
    @Body(new ValidationPipe()) updateBerthDto: UpdateBerthDto,
  ) {
    return this.berthService.update(_id, updateBerthDto);
  }
}
