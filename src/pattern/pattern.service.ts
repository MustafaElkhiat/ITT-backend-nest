import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pattern } from './entities/pattern.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateCheckPointDto } from './dto/create-check-point.dto';
import { UpdateCheckPointDto } from './dto/update-check-point.dto';
import { CheckPoint } from './entities/check-point.entity';

@Injectable()
export class PatternService {
  constructor(
    @InjectRepository(Pattern)
    private patternRepository: MongoRepository<Pattern>,
  ) {}

  create(createPatternDto: CreatePatternDto) {
    const pattern = {
      ...createPatternDto,
      checkPointList: [],
    };
    return this.patternRepository.save(pattern);
  }

  findAll() {
    return this.patternRepository.find();
  }

  async findOne(_id: ObjectId) {
    const pattern = await this.patternRepository.findOneBy({ _id });
    this.checkPatternNotFound(pattern);
    return pattern;
  }

  /**
   * Get pattern by code
   * @param code
   * @Return {Promise<Pattern>}
   */
  async findOneByCode(code: string) {
    const pattern = await this.patternRepository.findOneBy({ code });
    this.checkPatternNotFound(pattern);
    return pattern;
  }

  private checkPatternNotFound(pattern: Pattern) {
    if (!pattern) throw new NotFoundException('Pattern is not found');
  }

  async update(_id: ObjectId, updatePatternDto: UpdatePatternDto) {
    await this.patternRepository.update({ _id }, updatePatternDto);
    return this.findOne(_id);
  }

  async addCheckPoint(_id: ObjectId, createCheckPointDto: CreateCheckPointDto) {
    const pattern = await this.findOne(_id);
    this.checkPatternNotFound(pattern);
    const checkPoint = {
      ...createCheckPointDto,
      id: new ObjectId(),
    };
    pattern.checkPointList = [...pattern.checkPointList, checkPoint];
    return this.update(pattern._id, pattern);
  }

  async editCheckPoint(
    _id: ObjectId,
    updateCheckPointDto: UpdateCheckPointDto,
  ) {
    const pattern = await this.findOne(_id);
    this.checkPatternNotFound(pattern);
    pattern.checkPointList = pattern.checkPointList.map((checkPoint) =>
      checkPoint.id == updateCheckPointDto.id
        ? { ...checkPoint, ...updateCheckPointDto }
        : checkPoint,
    );
    return this.update(_id, pattern);
  }

  async addCheckPointListToPattern(
    _id: ObjectId,
    createCheckPointDtoList: CreateCheckPointDto[],
  ) {
    const pattern = await this.findOne(_id);
    this.checkPatternNotFound(pattern);
    pattern.checkPointList = createCheckPointDtoList.map((checkPoint) => {
      return { ...checkPoint, id: new ObjectId() };
    });
    return this.update(_id, pattern);
  }

  async editCheckPointListOfPattern(
    _id: ObjectId,
    checkPointList: CheckPoint[],
  ) {
    const pattern = await this.findOne(_id);
    this.checkPatternNotFound(pattern);
    pattern.checkPointList = checkPointList;
    return this.update(_id, pattern);
  }
}
