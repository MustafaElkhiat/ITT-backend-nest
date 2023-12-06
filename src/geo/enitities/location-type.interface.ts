/**
 * @Project : backend-nest
 * @File : location-type.interface.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/19/2023
 * @Time : 2:44 PM
 */
import { LocationTypeEnum } from './location-type.enum';

export interface LocationType {
  locationType: LocationTypeEnum;
}
