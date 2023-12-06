import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Cargo } from './entities/cargo.entity';
import { ObjectId } from 'mongodb';
import { CreateSubCargoDto } from './dto/create-sub-cargo.dto';
import { SubCargo } from './entities/subCargo.entity';
import { SubCargoDto } from './dto/sub-cargo.dto';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo) private cargoRepository: MongoRepository<Cargo>,
  ) {}

  /**
   * Add new Cargo
   * @param createCargoDto
   * @Return Cargo
   */
  addCargo(createCargoDto: CreateCargoDto) {
    const cargo = {
      ...createCargoDto,
      subCargoList: [],
    };
    return this.cargoRepository.save(cargo);
  }

  /**
   * Retrieve All Cargo
   * @Return Cargo[]
   */
  findAllCargo() {
    return this.cargoRepository.find();
  }

  /**
   * Retrieve Cargo By Id
   * @param _id cargo_id
   * @Return Cargo
   */
  async findCargo(_id: ObjectId) {
    const cargo = await this.cargoRepository.findOneBy({ _id });
    this.checkCargoFound(cargo);
    return cargo;
  }

  async editCargo(_id: ObjectId, updateCargoDto: UpdateCargoDto) {
    //return this.cargoModel.findByIdAndUpdate(id, updateCargoDto).lean();
    //return this.cargoRepository.update({ id }, updateCargoDto);
    await this.cargoRepository.update({ _id }, updateCargoDto);
    return this.findCargo(_id);
  }

  async editSubCargo(cargoCode: string, subCargo: SubCargoDto) {
    const cargo = await this.findCargoByCode(cargoCode);
    this.checkCargoFound(cargo);
    const isSubCargoCodeFound = this.isSubCargoCodeFound(
      cargo.subCargoList,
      subCargo.code,
    );
    this.checkSubCargoCodeNotFound(isSubCargoCodeFound);
    return this.handleEditSubCargo(cargo, subCargo);
  }

  private handleEditSubCargo(cargo: Cargo, editedSubCargo: SubCargoDto) {
    cargo.subCargoList = cargo.subCargoList.map((subCargo) =>
      subCargo.code === editedSubCargo.code ? editedSubCargo : subCargo,
    );
    return this.editCargo(cargo._id, cargo);
  }

  async addSubCargo(cargoCode: string, subCargo: CreateSubCargoDto) {
    const cargo = await this.findCargoByCode(cargoCode);
    this.checkCargoFound(cargo);
    const isCodeDuplicated = this.isSubCargoCodeFound(
      cargo.subCargoList,
      subCargo.code,
    );
    this.checkSubCargoCodeDuplication(isCodeDuplicated);
    return await this.addSubCargoToCargo(cargo, subCargo);
  }

  private checkSubCargoCodeDuplication(isCodeDuplicated: boolean) {
    if (isCodeDuplicated)
      throw new BadRequestException('Sub Cargo code is duplicated');
  }

  private checkSubCargoCodeNotFound(isCodeFound: boolean) {
    if (!isCodeFound)
      throw new NotFoundException('Sub Cargo code is not found');
  }

  private checkCargoFound(cargo: Cargo) {
    if (!cargo) throw new NotFoundException('Cargo is not found');
  }

  private async addSubCargoToCargo(
    cargo: Cargo,
    createSubCargoDto: CreateCargoDto,
  ) {
    cargo.subCargoList = [...cargo.subCargoList, createSubCargoDto];
    return await this.editCargo(cargo._id, cargo);
  }

  private isSubCargoCodeFound(subCargoList: SubCargo[], subCargoCode: string) {
    return !!subCargoList.filter((subCargo) => subCargo.code === subCargoCode)
      .length;
  }

  async findCargoByCode(code: string) {
    const cargo = await this.cargoRepository.findOneBy({ code });
    this.checkCargoFound(cargo);
    return cargo;
  }
}
