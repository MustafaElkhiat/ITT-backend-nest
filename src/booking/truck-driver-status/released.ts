import { TruckDriver } from '../entities/truck-driver.entity';
import { TruckDriverStatusInterface } from './status.interface';
import { ContractorService } from '../../contractor/contractor.service';

export abstract class Released implements TruckDriverStatusInterface {
  truckDriver: TruckDriver;
  contractorService: ContractorService;

  abstract changeTruckDriverStatus(): TruckDriver;

  abstract changeDriverStatus(): Promise<void>;

  abstract changeTruckStatus(): Promise<void>;
}
