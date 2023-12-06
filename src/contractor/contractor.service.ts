import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Contractor } from './entities/contractor.entity';
import { ObjectId } from 'mongodb';
import { CreateTruckDto } from './dto/create-truck.dto';
import { TruckStatusEnum } from './entities/TruckStatus.enum';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverStatusEnum } from './entities/DriverStatus.enum';
import { Driver } from './entities/driver.entity';
import { Truck } from './entities/truck.entity';

@Injectable()
export class ContractorService {
  constructor(
    @InjectRepository(Contractor)
    private contractorRepository: MongoRepository<Contractor>,
  ) {}

  create(createContractorDto: CreateContractorDto) {
    const contractor = {
      ...createContractorDto,
      truckList: [],
      driverList: [],
    };
    return this.contractorRepository.save(contractor);
  }

  findAll() {
    return this.contractorRepository.find();
  }

  async findContractor(_id: ObjectId) {
    const contractor = await this.contractorRepository.findOneBy({ _id });
    this.checkContractorNotFound(contractor);
    return contractor;
  }

  async findContractorByCode(code: string) {
    const contractor = await this.contractorRepository.findOneBy({ code });
    this.checkContractorNotFound(contractor);
    return contractor;
  }

  private checkContractorNotFound(contractor: Contractor) {
    if (!contractor) throw new NotFoundException('Contractor is not Found');
  }

  private checkTruckNotExist(isTruckExist: boolean, message: string) {
    if (isTruckExist) throw new BadRequestException(message);
  }

  async getTruckStatus(
    truckNumber: string,
    contractorCode: string,
  ): Promise<TruckStatusEnum> {
    const contractor = await this.findContractorByCode(contractorCode);
    const truck = contractor.truckList.find(
      (truck) => truck.number === truckNumber,
    );
    return truck.truckStatus;
  }

  async checkTruckNotAvailable(truckNumber: string, contractorCode: string) {
    const truckStatus = await this.getTruckStatus(truckNumber, contractorCode);
    if (truckStatus !== TruckStatusEnum.AVAILABLE)
      throw new ForbiddenException('Truck is not available');
  }

  async getDriverStatus(
    driverNationalID: string,
    contractorCode: string,
  ): Promise<DriverStatusEnum> {
    const contractor = await this.findContractorByCode(contractorCode);
    const driver = contractor.driverList.find(
      (driver) => driver.nationalID === driverNationalID,
    );
    return driver.driverStatus;
  }

  async checkDriverNotAvailable(
    driverNationalID: string,
    contractorCode: string,
  ) {
    const driverStatus = await this.getDriverStatus(
      driverNationalID,
      contractorCode,
    );
    if (driverStatus !== DriverStatusEnum.AVAILABLE)
      throw new ForbiddenException('Driver is not available');
  }

  async editContractor(
    _id: ObjectId,
    updateContractorDto: UpdateContractorDto,
  ) {
    const contractor = await this.findContractor(_id);
    this.checkContractorNotFound(contractor);
    await this.contractorRepository.update({ _id }, updateContractorDto);
    return this.findContractor(_id);
  }

  async addTruckToContractor(code: string, createTruckDto: CreateTruckDto) {
    const contractor = await this.findContractorByCode(code);
    this.checkContractorNotFound(contractor);
    await this.checkTruckExist(createTruckDto);
    return this.handleAddingTruckToContractor(contractor, createTruckDto);
  }

  async checkTruckExist(createTruckDto: CreateTruckDto) {
    const isTruckNumberExist = await this.isTruckNumberExist(
      createTruckDto.number,
    );
    const isTruckLicenseExist = await this.isTruckLicenseExist(
      createTruckDto.truckLicense,
    );

    const errors = [];
    if (isTruckNumberExist)
      errors.push({
        field: 'number',
        message: 'Truck number is already exist',
      });

    if (isTruckLicenseExist)
      errors.push({
        field: 'truckLicense',
        message: 'Truck license is already exist',
      });

    if (errors.length > 0) throw new ForbiddenException(errors);
  }

  async isTruckExist(createTruckDto: CreateTruckDto) {
    const contractors = await this.findAll();
    return !!contractors.filter((contractor) =>
      this.isTruckOfContractorExist(contractor, createTruckDto),
    ).length;
  }

  async isTruckNumberExist(number: string) {
    const contractors = await this.findAll();

    return !!contractors.filter((contractor) =>
      this.isTruckNumberExistOnContractor(contractor, number),
    ).length;
  }

  isTruckNumberExistOnContractor(contractor: Contractor, number: string) {
    return !!contractor.truckList.find((truck) => truck.number === number);
  }

  async isTruckLicenseExist(number: string) {
    const contractors = await this.findAll();
    return !!contractors.filter((contractor) =>
      this.isTruckLicenseExistOnContractor(contractor, number),
    ).length;
  }

  isTruckLicenseExistOnContractor(
    contractor: Contractor,
    truckLicense: string,
  ) {
    return !!contractor.truckList.find(
      (truck) => truck.truckLicense === truckLicense,
    );
  }

  isTruckOfContractorExist(
    contractor: Contractor,
    createTruckDto: CreateTruckDto,
  ) {
    return !!contractor.truckList.find(
      (truck) =>
        truck.truckLicense === createTruckDto.truckLicense &&
        truck.number === createTruckDto.number,
    );
  }

  private handleAddingTruckToContractor(
    contractor: Contractor,
    createTruckDto: CreateTruckDto,
  ) {
    createTruckDto = {
      ...createTruckDto,
      truckStatus: TruckStatusEnum.AVAILABLE,
    };
    contractor.truckList = [...contractor.truckList, createTruckDto];
    return this.editContractor(contractor._id, contractor);
  }

  async addDriverToContractor(code: string, createDriverDto: CreateDriverDto) {
    const contractor = await this.findContractorByCode(code);
    this.checkContractorNotFound(contractor);
    await this.checkDriverExist(createDriverDto);
    return this.handleAddingDriverToContractor(contractor, createDriverDto);
  }

  async isDriverNationalIDExist(nationalID: string) {
    const contractors = await this.findAll();

    return !!contractors.filter((contractor) =>
      this.isDriverNationalIDExistOnContractor(contractor, nationalID),
    ).length;
  }

  isDriverNationalIDExistOnContractor(
    contractor: Contractor,
    nationalID: string,
  ) {
    return !!contractor.driverList.find(
      (driver) => driver.nationalID === nationalID,
    );
  }

  async isDriverLicenseExist(drivingLicense: string) {
    const contractors = await this.findAll();
    return !!contractors.filter((contractor) =>
      this.isDriverLicenseExistOnContractor(contractor, drivingLicense),
    ).length;
  }

  isDriverLicenseExistOnContractor(
    contractor: Contractor,
    drivingLicense: string,
  ) {
    return !!contractor.driverList.find(
      (driver) => driver.drivingLicense === drivingLicense,
    );
  }

  async checkDriverExist(createDriverDto: CreateDriverDto) {
    const isDriverNationalIdExist = await this.isDriverNationalIDExist(
      createDriverDto.nationalID,
    );
    const isDriverLicenseExist = await this.isDriverLicenseExist(
      createDriverDto.drivingLicense,
    );

    const errors = [];
    if (isDriverNationalIdExist)
      errors.push({
        field: 'nationalID',
        message: 'National ID is already exist',
      });

    if (isDriverLicenseExist)
      errors.push({
        field: 'drivingLicense',
        message: 'Driving license is already exist',
      });

    if (errors.length > 0) throw new ForbiddenException(errors);
  }

  private handleAddingDriverToContractor(
    contractor: Contractor,
    createDriverDto: CreateDriverDto,
  ) {
    const { drivingLicense, name, nationalID } = createDriverDto;
    createDriverDto = {
      drivingLicense: drivingLicense.trim(),
      name: name.trim(),
      nationalID: nationalID.trim(),
      driverStatus: DriverStatusEnum.AVAILABLE,
    };
    contractor.driverList = [...contractor.driverList, createDriverDto];
    return this.editContractor(contractor._id, contractor);
  }

  editDriverOfContractor(contractor: Contractor, editedDriver: Driver) {
    contractor.driverList = contractor.driverList.map((driver) =>
      driver.nationalID === editedDriver.nationalID ? editedDriver : driver,
    );
    return this.editContractor(contractor._id, contractor);
  }

  editTruckOfContractor(contractor: Contractor, editedTruck: Truck) {
    contractor.truckList = contractor.truckList.map((truck) =>
      truck.truckLicense === editedTruck.truckLicense ? editedTruck : truck,
    );
    return this.editContractor(contractor._id, contractor);
  }

  async setDriverAvailable(contractorCode: string, driver: Driver) {
    const contractor = await this.findContractorByCode(contractorCode);
    this.checkContractorNotFound(contractor);
    return this.changeDriverStatus(
      contractor,
      driver,
      DriverStatusEnum.AVAILABLE,
    );
  }

  async setDriverNotAvailable(contractorCode: string, driver: Driver) {
    const contractor = await this.findContractorByCode(contractorCode);
    this.checkContractorNotFound(contractor);
    return this.changeDriverStatus(
      contractor,
      driver,
      DriverStatusEnum.NOT_AVAILABLE,
    );
  }

  changeDriverStatus(
    contractor: Contractor,
    driver: Driver,
    status: DriverStatusEnum,
  ) {
    const targetDriver = contractor.driverList.filter(
      (d) => d.nationalID === driver.nationalID,
    )[0];
    targetDriver.driverStatus = status;
    return this.editDriverOfContractor(contractor, targetDriver);
  }

  async setTruckAvailable(contractorCode: string, truck: Truck) {
    const contractor = await this.findContractorByCode(contractorCode);
    this.checkContractorNotFound(contractor);
    return this.changeTruckStatus(contractor, truck, TruckStatusEnum.AVAILABLE);
  }

  async setTruckNotAvailable(contractorCode: string, truck: Truck) {
    const contractor = await this.findContractorByCode(contractorCode);
    this.checkContractorNotFound(contractor);
    return this.changeTruckStatus(
      contractor,
      truck,
      TruckStatusEnum.NOT_AVAILABLE,
    );
  }

  async setTruckInMaintenance(contractorCode: string, truck: Truck) {
    const contractor = await this.findContractorByCode(contractorCode);
    this.checkContractorNotFound(contractor);
    return this.changeTruckStatus(
      contractor,
      truck,
      TruckStatusEnum.IN_MAINTENANCE,
    );
  }

  changeTruckStatus(
    contractor: Contractor,
    truck: Truck,
    status: TruckStatusEnum,
  ) {
    const targetTruck = contractor.truckList.find(
      (t) => t.truckLicense === truck.truckLicense,
    );
    targetTruck.truckStatus = status;
    return this.editTruckOfContractor(contractor, targetTruck);
  }
}
