import { Injectable, NotFoundException } from '@nestjs/common';

import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { MongoRepository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { LocationTypeEnum } from '../geo/enitities/location-type.enum';
import { GeoServicesInterface } from '../geo/geo-services.interface';

@Injectable()
export class WarehouseService implements GeoServicesInterface {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: MongoRepository<Warehouse>,
  ) {}

  async getGeoByCoordinates(lat: number, long: number) {
    return await this.findOneByCoordinates(lat, long);
  }

  create(createWarehouseDto: CreateWarehouseDto) {
    const warehouse = {
      ...createWarehouseDto,
      locationType: LocationTypeEnum.Warehouse,
    };
    return this.warehouseRepository.save(warehouse);
  }

  findAll() {
    return this.warehouseRepository.find();
  }

  findAllByBranch(branch: string) {
    return this.warehouseRepository.find({ branch });
  }

  async findOne(_id: ObjectId) {
    const warehouse = await this.warehouseRepository.findOneBy({ _id });
    this.checkWarehouseNotFound(warehouse);
    return warehouse;
  }

  private checkWarehouseNotFound(warehouse: Warehouse) {
    if (!warehouse) throw new NotFoundException('Warehouse is not found');
  }

  async findOneByCoordinates(lat: number, long: number) {
    const warehouse = await this.warehouseRepository.findOneBy({ lat, long });
    this.checkWarehouseNotFound(warehouse);
    return warehouse;
  }

  async findOneByCode(code: string) {
    const warehouse = await this.warehouseRepository.findOneBy({ code });
    this.checkWarehouseNotFound(warehouse);
    return warehouse;
  }

  async findOneByNumber(number: string) {
    const warehouse = await this.warehouseRepository.findOneBy({ number });
    this.checkWarehouseNotFound(warehouse);
    return warehouse;
  }

  async update(_id: ObjectId, updateWarehouseDto: UpdateWarehouseDto) {
    await this.warehouseRepository.update({ _id }, updateWarehouseDto);
    return this.findOne(_id);
  }
}
