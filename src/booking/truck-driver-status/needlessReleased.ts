import { TruckDriver } from '../entities/truck-driver.entity';
import { TruckDriverStatusEnum } from '../entities/truck-driver-status.enum';
import { ReleaseTypeEnum } from '../entities/release-type.enum';

import { Released } from './released';
import { ContractorService } from '../../contractor/contractor.service';

export class NeedlessReleased extends Released {
  constructor(
    contactorService: ContractorService,
    public truckDriver: TruckDriver,
    public reason: string,
  ) {
    super();
    this.contractorService = contactorService;
    /*this.truckDriver = truckDriver;
    this.reason = reason;*/
  }

  //truckDriver: TruckDriver;
  //reason: string;

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

  async changeTruckStatus(): Promise<void> {
    await this.contractorService.setTruckAvailable(
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
