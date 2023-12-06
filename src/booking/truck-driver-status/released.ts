import { Inject } from '@nestjs/common';
import { ContractorService } from '../contractor/contractor.service';
import { TruckDriver } from './entities/truck-driver.entity';
import { TruckDriverStatusInterface } from './status.interface';

export abstract class Released implements TruckDriverStatusInterface {
  @Inject()
  private readonly contractorService: ContractorService;
  truckDriver: TruckDriver;

  abstract changeTruckDriverStatus(): TruckDriver;

  async changeDriverStatus(): Promise<void> {
    await this.contractorService.setDriverAvailable(
      this.truckDriver.contractor.code,
      this.truckDriver.driver,
    );
  }

  abstract changeTruckStatus(): void;
}