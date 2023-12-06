/**
 * @Project : backend-nest
 * @File : status.interface.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/25/2023
 * @Time : 3:26 PM
 */
import { TruckDriver } from './entities/truck-driver.entity';
import { TruckDriverStatusEnum } from './entities/truck-driver-status.enum';
import { ReleaseTypeEnum } from './entities/release-type.enum';
import { Schema } from 'mongoose';
import Date = module;
import { ContractorService } from '../contractor/contractor.service';
import { Inject } from '@nestjs/common';

export interface TruckDriverStatusInterface {
  changeTruckDriverStatus(): TruckDriver;

  changeDriverStatus(): void;

  changeTruckStatus(): void;

  truckDriver: TruckDriver;
}

export class Working implements TruckDriverStatusInterface {
  @Inject()
  private readonly contractorService: ContractorService;

  constructor(truckDriver: TruckDriver) {
    this.truckDriver = truckDriver;
  }

  truckDriver: TruckDriver;

  changeTruckDriverStatus(): TruckDriver {
    this.truckDriver.truckDriverStatus = TruckDriverStatusEnum.WORKING;
    this.truckDriver.truckDriverStatusDetails = [
      ...this.truckDriver.truckDriverStatusDetails,
      {
        truckDriverStatus: TruckDriverStatusEnum.WORKING,
        time: new Date().toLocaleString('en-GB'),
      },
    ];
    return this.truckDriver;
  }

  async changeDriverStatus(): Promise<void> {
    await this.contractorService.setDriverNotAvailable(
      this.truckDriver.contractor.code,
      this.truckDriver.driver,
    );
  }

  async changeTruckStatus(): Promise<void> {
    await this.contractorService.setTruckNotAvailable(
      this.truckDriver.contractor.code,
      this.truckDriver.truck,
    );
  }
}

export abstract class Released implements TruckDriverStatusInterface {
  truckDriver: TruckDriver;

  abstract changeTruckDriverStatus(): TruckDriver;

  abstract changeDriverStatus(): void;

  abstract changeTruckStatus(): void;
}

export class MaintenanceReleased extends Released {
  constructor(truckDriver: TruckDriver, reason: string) {
    super();
    this.truckDriver = truckDriver;
    this.reason = reason;
  }

  truckDriver: TruckDriver;
  reason: string;

  changeTruckDriverStatus(): TruckDriver {
    this.truckDriver.truckDriverStatus = TruckDriverStatusEnum.RELEASED;
    this.truckDriver.truckDriverStatusDetails = [
      ...this.truckDriver.truckDriverStatusDetails,
      {
        truckDriverStatus: TruckDriverStatusEnum.RELEASED,
        time: new Date().toLocaleString('en-GB'),
        releaseType: ReleaseTypeEnum.MAINTENANCE,
        releaseReason: this.reason,
      },
    ];
    return this.truckDriver;
  }
}

export class NeedlessSReleased extends Released {
  constructor(truckDriver: TruckDriver, reason: string) {
    super();
    this.truckDriver = truckDriver;
    this.reason = reason;
  }

  truckDriver: TruckDriver;
  reason: string;

  changeTruckDriverStatus(): TruckDriver {
    this.truckDriver.truckDriverStatus = TruckDriverStatusEnum.RELEASED;
    this.truckDriver.truckDriverStatusDetails = [
      ...this.truckDriver.truckDriverStatusDetails,
      {
        truckDriverStatus: TruckDriverStatusEnum.RELEASED,
        time: new Date().toLocaleString('en-GB'),
        releaseType: ReleaseTypeEnum.NEEDLESS,
        releaseReason: this.reason,
      },
    ];
    return this.truckDriver;
  }
}

export class EndOfOperationsReleased extends Released {
  constructor(truckDriver: TruckDriver) {
    super();
    this.truckDriver = truckDriver;
  }

  truckDriver: TruckDriver;

  changeTruckDriverStatus(): TruckDriver {
    this.truckDriver.truckDriverStatus = TruckDriverStatusEnum.RELEASED;
    this.truckDriver.truckDriverStatusDetails = [
      ...this.truckDriver.truckDriverStatusDetails,
      {
        truckDriverStatus: TruckDriverStatusEnum.RELEASED,
        time: new Date().toLocaleString('en-GB'),
        releaseType: ReleaseTypeEnum.END_OF_OPERATIONS,
      },
    ];
    return this.truckDriver;
  }
}
