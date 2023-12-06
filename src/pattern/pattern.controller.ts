import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { PatternService } from './pattern.service';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { ObjectId } from 'mongodb';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';
import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { UpdateCheckPointDto } from './dto/update-check-point.dto';
import { CheckPoint } from './entities/check-point.entity';

@Controller('api/pattern')
export class PatternController {
  constructor(private readonly patternService: PatternService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body(new ValidationPipe()) createPatternDto: CreatePatternDto) {
    return this.patternService.create(createPatternDto);
  }

  @Get()
  findAll() {
    return this.patternService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.patternService.findOne(id);
  }

  @Get('code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.patternService.findOneByCode(code);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body(new ValidationPipe()) updatePatternDto: UpdatePatternDto,
  ) {
    return this.patternService.update(id, updatePatternDto);
  }

  @Post(':id/checkPoint')
  addCheckPointToPattern(
    @Param('id', ParseObjectIdPipe) _id: ObjectId,
    @Body(new ValidationPipe()) createCheckPointDto: CreateCheckPointDto,
  ) {
    return this.patternService.addCheckPoint(_id, createCheckPointDto);
  }

  @Put(':id/checkPoint')
  editCheckPointOfPattern(
    @Param('id', ParseObjectIdPipe) _id: ObjectId,
    @Body(new ValidationPipe()) updateCheckPointDto: UpdateCheckPointDto,
  ) {
    return this.patternService.editCheckPoint(_id, updateCheckPointDto);
  }

  @Post(':id/checkPointList')
  addCheckPointListToPattern(
    @Param('id', ParseObjectIdPipe) _id: ObjectId,
    @Body(new ParseArrayPipe({ items: CreateCheckPointDto }))
    createCheckPointDtoList: CreateCheckPointDto[],
  ) {
    return this.patternService.addCheckPointListToPattern(
      _id,
      createCheckPointDtoList,
    );
  }

  @Put(':id/checkPointList')
  editCheckPointListOfPattern(
    @Param('id', ParseObjectIdPipe) _id: ObjectId,
    @Body() checkPointList: CheckPoint[],
  ) {
    return this.patternService.editCheckPointListOfPattern(_id, checkPointList);
  }
}
