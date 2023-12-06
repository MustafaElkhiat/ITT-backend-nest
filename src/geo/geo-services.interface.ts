import { Geo } from './enitities/geo.interface';

/**
 * @Project : backend-nest
 * @File : geo-services.interface.ts
 * @Author : Eng. Mustafa Elkhiat
 * @Date : 11/27/2023
 * @Time : 11:05 AM
 */
export interface GeoServicesInterface {
  getGeoByCoordinates: (lat: number, long: number) => Promise<Geo>;
}
