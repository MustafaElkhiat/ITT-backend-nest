import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBerthDto } from './dto/create-berth.dto';
import { UpdateBerthDto } from './dto/update-berth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Berth } from './entities/berth.entity';
import { ObjectId } from 'mongodb';
import { LocationTypeEnum } from '../geo/enitities/location-type.enum';
import { GeoServicesInterface } from '../geo/geo-services.interface';

@Injectable()
export class BerthService implements GeoServicesInterface {
  constructor(
    @InjectRepository(Berth)
    private berthRepository: MongoRepository<Berth>,
  ) {}

  async getGeoByCoordinates(lat: number, long: number) {
    return await this.findOneByCoordinates(lat, long);
  }

  create(createBerthDto: CreateBerthDto) {
    const berth = {
      ...createBerthDto,
      locationType: LocationTypeEnum.Berth,
    };
    return this.berthRepository.save(berth);
  }

  findAll() {
    return this.berthRepository.find();
  }

  findAllByBranch(branch: string) {
    return this.berthRepository.find({ branch });
  }

  async findOne(_id: ObjectId) {
    const berth = await this.berthRepository.findOneBy({ _id });
    this.checkBerthNotFound(berth);
    return berth;
  }

  async findOneByCoordinates(lat: number, long: number) {
    const berth = await this.berthRepository.findOneBy({ lat, long });
    this.checkBerthNotFound(berth);
    return berth;
  }

  private checkBerthNotFound(berth: Berth) {
    if (!berth) throw new NotFoundException('Berth is not found');
  }

  async findOneByCode(code: string) {
    const berth = await this.berthRepository.findOneBy({ code });
    this.checkBerthNotFound(berth);
    return berth;
  }

  async findOneByNumber(number: string) {
    const berth = await this.berthRepository.findOneBy({ number });
    this.checkBerthNotFound(berth);
    return berth;
  }

  async update(_id: ObjectId, updateBerthDto: UpdateBerthDto) {
    await this.berthRepository.update({ _id }, updateBerthDto);
    return this.findOne(_id);
  }
}
