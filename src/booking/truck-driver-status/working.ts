import { TruckDriver } from '../entities/truck-driver.entity';
import { TruckDriverStatusEnum } from '../entities/truck-driver-status.enum';
import { TruckDriverStatusInterface } from './status.interface';
import { ContractorService } from '../../contractor/contractor.service';

export class Working implements TruckDriverStatusInterface {
  constructor(
    public contractorService: ContractorService,
    public truckDriver: TruckDriver,
  ) {}

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
