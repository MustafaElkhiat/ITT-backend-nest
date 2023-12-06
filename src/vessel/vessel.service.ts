import { Injectable } from '@nestjs/common';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { UpdateVesselDto } from './dto/update-vessel.dto';

@Injectable()
export class VesselService {
  create(createVesselDto: CreateVesselDto) {
    return 'This action adds a new vessel';
  }

  findAll() {
    return `This action returns all vessel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vessel`;
  }

  update(id: number, updateVesselDto: UpdateVesselDto) {
    return `This action updates a #${id} vessel`;
  }

  remove(id: number) {
    return `This action removes a #${id} vessel`;
  }
}
