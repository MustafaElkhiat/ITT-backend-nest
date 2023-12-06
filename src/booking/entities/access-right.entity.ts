import { Column } from 'typeorm';
import { CheckPoint } from '../../pattern/entities/check-point.entity';
import { Geo } from '../../geo/enitities/geo.interface';

/**
 * @Project : backend-nest
 * @File : access-right.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/26/2023
 * @Time : 10:16 AM
 */
export class AccessRight {
  @Column()
  checkPoint: CheckPoint;
  @Column()
  user: string;
  @Column()
  location: Geo;
}
