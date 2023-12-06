import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { UpdateVesselDto } from './dto/update-vessel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Vessel } from './entities/vessel.entity';
import { ObjectId } from 'mongodb';
import { CreateVoyageDto } from './dto/create-voyage.dto';
import { VoyageDto } from './dto/voyage.dto';

@Injectable()
export class VesselService {
  constructor(
    @InjectRepository(Vessel) private vesselRepository: MongoRepository<Vessel>,
  ) {}

  create(createVesselDto: CreateVesselDto) {
    const vessel = { ...createVesselDto, voyageList: [] };
    return this.vesselRepository.save(vessel);
  }

  async addVoyage(imo: string, createVoyageDto: CreateVoyageDto) {
    const vessel = await this.findVesselByIMO(imo);
    const isVesselOpened = this.isVesselOpened(vessel);
    if (isVesselOpened)
      throw new ForbiddenException('Vessel is already have opened voyage');
    return this.handleAddVoyageToVessel(vessel, createVoyageDto);
  }

  async updateVoyage(imo: string, updateVoyageDto: VoyageDto) {
    const vessel = await this.findVesselByIMO(imo);
    return this.handleUpdateVoyage(vessel, updateVoyageDto);
  }

  private handleUpdateVoyage(vessel: Vessel, editedVoyage: VoyageDto) {
    //const openedVoyage = this.getOpenedVoyageOfVessel(vessel);
    this.checkIsVoyageNotFound(vessel, editedVoyage);
    vessel.voyageList = vessel.voyageList.map((voyage) =>
      voyage.id === editedVoyage.id ? editedVoyage : voyage,
    );
    return this.updateVessel(vessel._id, vessel);
  }

  isVoyageIdFound(vessel: Vessel, editedVoyage: VoyageDto) {
    return !!vessel.voyageList.filter((voyage) => voyage.id === editedVoyage.id)
      .length;
  }

  checkIsVoyageNotFound(vessel: Vessel, voyage: VoyageDto) {
    if (!this.isVoyageIdFound(vessel, voyage))
      throw new NotFoundException('Voyage Id is not found');
  }

  private getOpenedVoyageOfVessel(vessel: Vessel) {
    return vessel.voyageList.filter(
      (voyage) => voyage.departureTime == '' || voyage.departureTime == null,
    )[0];
  }

  async getOpenedVoyageOfVesselByIMO(imo: string) {
    const vessel = await this.findVesselByIMO(imo);
    return this.getOpenedVoyageOfVessel(vessel);
  }

  private isVesselOpened(vessel: Vessel) {
    return !!vessel.voyageList.filter(
      (voyage) => voyage.departureTime === '' || voyage.departureTime == null,
    ).length;
  }

  async isVesselImoOpened(imo: string) {
    const vessel = await this.findVesselByIMO(imo);
    return this.isVesselOpened(vessel);
  }

  async checkVesselNotHaveOpenedVoyage(imo: string) {
    const isVesselOpened = await this.isVesselImoOpened(imo);
    if (!isVesselOpened)
      throw new ForbiddenException('Vessel is not have opened voyage');
  }

  async findOpenedVessels() {
    const vesselList = await this.findAll();
    return vesselList.filter((vessel) => this.isVesselOpened(vessel));
  }

  private handleAddVoyageToVessel(
    vessel: Vessel,
    createVoyageDto: CreateVoyageDto,
  ) {
    const voyage = { ...createVoyageDto, id: vessel.voyageList.length + 1 };
    vessel.voyageList = [...vessel.voyageList, voyage];
    return this.updateVessel(vessel._id, vessel);
  }

  findAll() {
    return this.vesselRepository.find();
  }

  async findVessel(_id: ObjectId) {
    const vessel = await this.vesselRepository.findOneBy({ _id });
    this.checkVesselFound(vessel);
    return vessel;
  }

  async findVesselByIMO(imo: string) {
    const vessel = await this.vesselRepository.findOneBy({ imo });
    this.checkVesselFound(vessel);
    return vessel;
  }

  private checkVesselFound(vessel: Vessel) {
    if (!vessel) throw new NotFoundException('Vessel is not found');
  }

  async updateVessel(_id: ObjectId, updateVesselDto: UpdateVesselDto) {
    await this.findVessel(_id);
    await this.vesselRepository.update({ _id }, updateVesselDto);
    return this.findVessel(_id);
  }
}
