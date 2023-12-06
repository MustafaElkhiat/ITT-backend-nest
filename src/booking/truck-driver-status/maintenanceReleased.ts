import { ContractorService } from '../../contractor/contractor.service';
import { TruckDriver } from '../entities/truck-driver.entity';
import { TruckDriverStatusEnum } from '../entities/truck-driver-status.enum';
import { ReleaseTypeEnum } from '../entities/release-type.enum';

import { Released } from './released';

export class MaintenanceReleased extends Released {
  constructor(
    contractorService: ContractorService,
    truckDriver: TruckDriver,
    reason: string,
  ) {
    super();
    this.truckDriver = truckDriver;
    this.reason = reason;
    this.contractorService = contractorService;
  }

  truckDriver: TruckDriver;
  reason: string;
  contractorService: ContractorService;

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

  async changeTruckStatus(): Promise<void> {
    await this.contractorService.setTruckInMaintenance(
      this.truckDriver.contractor.code,
      this.truckDriver.truck,
    );
  }

  async changeDriverStatus(): Promise<void> {
    await this.contractorService.setDriverAvailable(
      this.truckDriver.contractor.code,
      this.truckDriver.driver,
    );
  }
}
