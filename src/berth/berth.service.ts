import { Injectable } from '@nestjs/common';
import { CreateBerthDto } from './dto/create-berth.dto';
import { UpdateBerthDto } from './dto/update-berth.dto';

@Injectable()
export class BerthService {
  create(createBerthDto: CreateBerthDto) {
    return 'This action adds a new berth';
  }

  findAll() {
    return `This action returns all berth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} berth`;
  }

  update(id: number, updateBerthDto: UpdateBerthDto) {
    return `This action updates a #${id} berth`;
  }

  remove(id: number) {
    return `This action removes a #${id} berth`;
  }
}
