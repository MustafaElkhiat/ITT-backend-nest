import { Column } from 'typeorm';

/**
 * @Project : backend-nest
 * @File : voyage.entity.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 10/18/2023
 * @Time : 1:10 PM
 */
export class Voyage {
  @Column()
  id: number;
  @Column()
  arrivalTime: string;
  @Column()
  departureTime?: string;
  @Column()
  eta: string;
  @Column()
  etd?: string;
}
