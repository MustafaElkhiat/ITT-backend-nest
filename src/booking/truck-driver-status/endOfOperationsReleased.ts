import { Inject } from '@nestjs/common';
import { ContractorService } from '../contractor/contractor.service';
import { TruckDriver } from './entities/truck-driver.entity';
import { TruckDriverStatusEnum } from './entities/truck-driver-status.enum';
import { ReleaseTypeEnum } from './entities/release-type.enum';
import { Released } from './status.interface';

export class EndOfOperationsReleased extends Released {
  @Inject()
  private readonly contractorService: ContractorService;

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

  async changeTruckStatus(): Promise<void> {
    await this.contractorService.setTruckAvailable(
      this.truckDriver.contractor.code,
      this.truckDriver.truck,
    );
  }
}