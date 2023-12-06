import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { BookingStatus } from './entities/booking-status.enum';
import { VesselService } from '../vessel/vessel.service';
import { ObjectId } from 'mongodb';
import { CreateTruckDriverDto } from './dto/create-truck-driver.dto';
import { TruckDriver } from './entities/truck-driver.entity';
import { ContractorService } from '../contractor/contractor.service';
import { TruckDriverStatusInterface } from './truck-driver-status/status.interface';
import { Released } from './truck-driver-status/released';
import { Working } from './truck-driver-status/working';
import { MaintenanceReleased } from './truck-driver-status/maintenanceReleased';
import { NeedlessReleased } from './truck-driver-status/needlessReleased';
import { EndOfOperationsReleased } from './truck-driver-status/endOfOperationsReleased';
import { ReleaseTruckDriverDto } from './dto/release-truck-driver.dto';
import { ReturnTruckDriverDto } from './dto/return-truck-driver.dto';
import { BookingVessel } from './entities/booking-vessel.entity';
import { CreateBookingPatternDto } from './dto/create-booking-pattern.dto';
import { TruckDriverStatusEnum } from './entities/truck-driver-status.enum';
import { Trip } from './entities/trip.entity';
import { PatternService } from '../pattern/pattern.service';
import { TripCheckPoint } from './entities/trip-check-point.entity';
import { GeoServicesInterface } from '../geo/geo-services.interface';
import { BerthService } from '../berth/berth.service';
import { WarehouseService } from '../warehouse/warehouse.service';
import { CheckPoint } from '../pattern/entities/check-point.entity';
import { Pattern } from '../pattern/entities/pattern.entity';
import { CreateTripCheckPointDto } from './dto/create-trip-check-point.dto';
import { Geo } from '../geo/enitities/geo.interface';
import { RepeatEnum } from '../pattern/entities/repeat.enum';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: MongoRepository<Booking>,
    private vesselService: VesselService,
    private contractorService: ContractorService,
    private usersService: UsersService,
    private patternService: PatternService,
    private warehouseService: WarehouseService,
    private berthService: BerthService,
  ) {}

  geoService: GeoServicesInterface;

  async createBooking(createBookingDto: CreateBookingDto) {
    await this.checkVesselInOpenedBooking(createBookingDto.vessel);
    await this.vesselService.checkVesselNotHaveOpenedVoyage(
      createBookingDto.vessel.imo,
    );
    const voyage = await this.vesselService.getOpenedVoyageOfVesselByIMO(
      createBookingDto.vessel.imo,
    );
    const booking = {
      ...createBookingDto,
      openedAt: new Date().toLocaleString('en-GB'),
      truckDriverList: [],
      bookingStatus: BookingStatus.OPENED,
      voyage: voyage,
    };
    return this.bookingRepository.save(booking);
  }

  private async checkVesselInOpenedBooking(vessel: BookingVessel) {
    const isVesselInOpenedBooking = await this.isVesselInOpenedBooking(vessel);
    if (isVesselInOpenedBooking)
      throw new ForbiddenException('Vessel already exist in opened booking');
  }

  async isVesselInOpenedBooking(vessel: BookingVessel) {
    const openedBookings = await this.findAllOpeningBookingList();
    return !!openedBookings.filter(
      (booking) =>
        booking.vessel._id === vessel._id || booking.vessel.imo === vessel.imo,
    ).length;
  }

  findAll() {
    return this.bookingRepository.find();
  }

  async findBooking(_id: ObjectId) {
    const booking = await this.bookingRepository.findOneBy({ _id });
    this.checkBookingNotFound(booking);
    return booking;
  }

  /**
   * Get Booking by booking number
   * @param bookingNumber
   * @Return {Booking}
   */
  async findBookingByNumber(bookingNumber: string) {
    const booking = await this.bookingRepository.findOneBy({ bookingNumber });
    this.checkBookingNotFound(booking);
    return booking;
  }

  async findBookingByWorkOrderNumber(workOrderNumber: string) {
    const booking = await this.bookingRepository.findOneBy({ workOrderNumber });
    this.checkBookingNotFound(booking);
    return booking;
  }

  /**
   * Check booking is not found
   * @param booking
   * @private
   */
  private checkBookingNotFound(booking: Booking) {
    if (!booking) throw new NotFoundException('Booking is not found');
  }

  /**
   * Check booking in not closed
   * @param booking
   * @private
   */
  private checkBookingNotClosed(booking: Booking) {
    if (!!booking.closedAt)
      throw new ForbiddenException('Booking is already closed');
  }

  async updateBooking(_id: ObjectId, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findBooking(_id);
    this.checkBookingNotFound(booking);
    /*await this.checkVesselInOpenedBooking(updateBookingDto.vessel);
    await this.vesselService.checkVesselNotHaveOpenedVoyage(
      updateBookingDto.vessel.imo,
    );*/
    await this.bookingRepository.update({ _id }, updateBookingDto);
    return this.findBooking(_id);
  }

  async addTruckDriverToBooking(
    bookingNumber: string,
    createTruckDriver: CreateTruckDriverDto,
  ) {
    const booking = await this.findBookingByNumber(bookingNumber);
    this.checkBookingNotFound(booking);
    await this.contractorService.checkDriverNotAvailable(
      createTruckDriver.driver.nationalID,
      createTruckDriver.contractor.code,
    );
    await this.contractorService.checkTruckNotAvailable(
      createTruckDriver.truck.number,
      createTruckDriver.contractor.code,
    );
    return this.handleAddingTruckDriverToBooking(booking, createTruckDriver);
  }

  private async handleAddingTruckDriverToBooking(
    booking: Booking,
    createTruckDriver: CreateTruckDriverDto,
  ) {
    let truckDriver: TruckDriver = {
      ...createTruckDriver,
      id: booking.truckDriverList.length + 1,
      truckDriverStatusDetails: [],
      tripList: [],
    };
    const working = new Working(this.contractorService, truckDriver);
    truckDriver = this.changeTruckDriverStatus(working);
    booking.truckDriverList = [...booking.truckDriverList, truckDriver];
    const result = this.updateBooking(booking._id, booking);
    await this.changeDriverStatus(working);
    await this.changeTruckStatus(working);
    return result;
  }

  async returnBackTruck(
    bookingNumber: string,
    returnTruckDriverDto: ReturnTruckDriverDto,
  ) {
    let truckDriver = await this.findTruckDriverOfBookingById(
      bookingNumber,
      returnTruckDriverDto.truckDriverId,
    );
    const booking = await this.findBookingByNumber(bookingNumber);
    const working = new Working(this.contractorService, truckDriver);
    truckDriver = this.changeTruckDriverStatus(working);
    const result = await this.updateTruckDriverOfBooking(booking, truckDriver);
    await this.changeDriverStatus(working);
    await this.changeTruckStatus(working);
    return result;
  }

  private changeTruckDriverStatus(status: TruckDriverStatusInterface) {
    return status.changeTruckDriverStatus();
  }

  private changeDriverStatus(status: TruckDriverStatusInterface) {
    return status.changeDriverStatus();
  }

  private changeTruckStatus(status: TruckDriverStatusInterface) {
    return status.changeTruckStatus();
  }

  async updateTruckDriverOfBooking(booking: Booking, truckDriver: TruckDriver) {
    booking.truckDriverList = booking.truckDriverList.map((td) =>
      td.id === truckDriver.id ? truckDriver : td,
    );
    return await this.updateBooking(booking._id, booking);
  }

  async releaseTruckDriverFromBooking(
    bookingNumber: string,
    released: Released,
  ) {
    const booking = await this.findBookingByNumber(bookingNumber);
    this.checkBookingNotFound(booking);
    const truckDriver = this.changeTruckDriverStatus(released);
    const result = this.updateTruckDriverOfBooking(booking, truckDriver);
    await this.changeDriverStatus(released);
    await this.changeTruckStatus(released);
    return result;
  }

  async releaseTruckDriverForMaintenance(
    bookingNumber: string,
    releaseTruckDriverDto: ReleaseTruckDriverDto,
  ) {
    const truckDriver = await this.findTruckDriverOfBookingById(
      bookingNumber,
      releaseTruckDriverDto.truckDriverId,
    );
    const maintenanceReleased = new MaintenanceReleased(
      this.contractorService,
      truckDriver,
      releaseTruckDriverDto.reason,
    );
    return this.releaseTruckDriverFromBooking(
      bookingNumber,
      maintenanceReleased,
    );
  }

  /**
   * Get truckDriver by id and booking number
   * @param bookingNumber
   * @param truckDriverId
   * @Return {Promise<TruckDriver>}
   */
  async findTruckDriverOfBookingById(
    bookingNumber: string,
    truckDriverId: number,
  ) {
    const booking = await this.findBookingByNumber(bookingNumber);
    return booking.truckDriverList.find(
      (truckDriver) => truckDriver.id === truckDriverId,
    );
  }

  async releaseTruckDriverForNeedless(
    bookingNumber: string,
    releaseTruckDriverDto: ReleaseTruckDriverDto,
  ) {
    const truckDriver = await this.findTruckDriverOfBookingById(
      bookingNumber,
      releaseTruckDriverDto.truckDriverId,
    );
    const needlessReleased = new NeedlessReleased(
      this.contractorService,
      truckDriver,
      releaseTruckDriverDto.reason,
    );
    return this.releaseTruckDriverFromBooking(bookingNumber, needlessReleased);
  }

  async releaseTruckDriverForEndOfOperations(
    bookingNumber: string,
    truckDriver: TruckDriver,
  ) {
    const endOfOperationReleased = new EndOfOperationsReleased(
      this.contractorService,
      truckDriver,
    );
    await this.releaseTruckDriverFromBooking(
      bookingNumber,
      endOfOperationReleased,
    );
  }

  async findAllOpeningBookingList() {
    const bookingList = await this.findAll();
    return bookingList.filter(
      (booking) => booking.bookingStatus === BookingStatus.OPENED,
    );
  }

  async updatePatternToBooking(
    _id: ObjectId,
    createBookingPattern: CreateBookingPatternDto,
  ) {
    const booking = await this.findBooking(_id);
    this.checkBookingNotFound(booking);
    if (booking.closedAt) throw new ForbiddenException('Booking is closed');
    booking.pattern = createBookingPattern.pattern;
    booking.accessRightList = createBookingPattern.accessRightList;
    return this.updateBooking(_id, booking);
  }

  async addTripCheckPoint(
    bookingNumber: string,
    createTripCheckPointDto: CreateTripCheckPointDto,
  ) {
    const booking = await this.findBookingByNumber(bookingNumber);

    this.checkBookingNotFound(booking);

    this.checkBookingNotClosed(booking);
    const truckDriver = await this.findTruckDriverOfBookingById(
      bookingNumber,
      createTripCheckPointDto.truckDriverId,
    );
    this.checkTruckDriverNotReleased(truckDriver);
    const trip = this.getOpenedTripOrOpenOne(truckDriver);

    const order = this.getLastTripCheckPointOrder(trip);
    const pattern = await this.patternService.findOneByCode(
      booking.pattern.code,
    );
    const checkPoint = this.getTargetCheckPoint(truckDriver, pattern, order);
    const location = this.getLocationOfCheckPoint(booking, checkPoint);
    this.checkCurrentLocationInCorrect(location, createTripCheckPointDto);
    const currentUser = await this.usersService.findOneByEmail(
      createTripCheckPointDto.createdBy,
    );
    const userEmail = this.getUserOfCheckPoint(booking, checkPoint);
    this.checkCurrentUserIsAuthorized(currentUser, userEmail);
    this.addCheckPointToTrip(checkPoint, trip, currentUser);
    const previousTripCheckPoint = this.getPreviousTripCheckPoint(trip, order);
    this.setPreviousCheckPointDuration(previousTripCheckPoint);
    this.closeTrip(order, pattern, trip);
    return this.updateTruckDriverOfBooking(booking, truckDriver);
  }

  private checkCurrentUserIsAuthorized(currentUser: User, userEmail: string) {
    if (currentUser.email !== userEmail)
      throw new ForbiddenException(
        'User is not authorized for this checkpoint',
      );
  }

  /**
   * Get target checkpoint
   * @param truckDriver
   * @param pattern
   * @param order
   * @Return {CheckPoint}
   * @private
   */
  private getTargetCheckPoint(
    truckDriver: TruckDriver,
    pattern: Pattern,
    order: number,
  ) {
    const checkPoint = this.getCheckPoint(pattern, order + 1);
    if (
      checkPoint.repeat === RepeatEnum.FIRST_TIME &&
      truckDriver.tripList.length > 1
    ) {
      return this.getCheckPoint(pattern, order + 2);
    }
    return checkPoint;
  }

  private closeTrip(order: number, pattern: Pattern, trip: Trip) {
    if (order + 1 == pattern.checkPointList.length) {
      trip.isOpened = false;
      trip.closedAt = new Date().toLocaleString();
    }
  }

  private setPreviousCheckPointDuration(lastTripCheckPoint: TripCheckPoint) {
    if (lastTripCheckPoint) {
      lastTripCheckPoint.duration =
        new Date().getTime() - new Date(lastTripCheckPoint.time).getTime();
    }
  }

  private getPreviousTripCheckPoint(trip: Trip, order: number) {
    return trip.tripCheckPointList.find(
      (tripCheckPoint) => tripCheckPoint.checkPoint.order == order,
    );
  }

  private getLastTripCheckPoint(trip: Trip) {
    return trip.tripCheckPointList[trip.tripCheckPointList.length - 1];
  }

  /**
   * Get last trip checkpoint order
   * @param trip
   * @Ruturn {number}
   * @private
   */
  private getLastTripCheckPointOrder(trip: Trip) {
    const lastTripCheckPoint = this.getLastTripCheckPoint(trip);
    return lastTripCheckPoint ? +lastTripCheckPoint.checkPoint.order : 0;
  }

  private checkCurrentLocationInCorrect(
    location: Geo,
    createTripCheckPointDto: CreateTripCheckPointDto,
  ) {
    if (
      location.lat !== createTripCheckPointDto.lat ||
      location.long !== createTripCheckPointDto.long
    )
      throw new ForbiddenException('Location is incorrect');
  }

  private getCheckPoint(pattern: Pattern, order: number) {
    return pattern.checkPointList.find((checkList) => checkList.order == order);
  }

  private addCheckPointToTrip(checkPoint: CheckPoint, trip: Trip, user: User) {
    const tripCheckPoint: TripCheckPoint = {
      checkPoint,
      time: new Date().toLocaleString(),
      createdBy: user.name,
    };
    trip.tripCheckPointList.push(tripCheckPoint);
    return trip;
  }

  private getLocationOfCheckPoint(booking: Booking, checkPoint: CheckPoint) {
    return booking.accessRightList.find(
      (accessRight) => accessRight.checkPoint.id == checkPoint.id,
    ).location;
  }

  private getUserOfCheckPoint(booking: Booking, checkPoint: CheckPoint) {
    return booking.accessRightList.find(
      (accessRight) => accessRight.checkPoint.id == checkPoint.id,
    ).user;
  }

  /**
   * Get Trip if already open or open it if not open trip found
   * @param truckDriver
   * @Return {Trip}
   * @private
   */
  private getOpenedTripOrOpenOne(truckDriver: TruckDriver) {
    let trip = this.getOpenedTrip(truckDriver);
    if (!trip) {
      this.openTrip(truckDriver);
      trip = this.getOpenedTrip(truckDriver);
    }
    return trip;
  }

  private getOpenedTrip(truckDriver: TruckDriver) {
    return truckDriver.tripList.find((trip) => trip.isOpened);
  }

  /**
   * Check truck driver is not released
   * @param truckDriver
   * @private
   */
  private checkTruckDriverNotReleased(truckDriver: TruckDriver) {
    if (truckDriver.truckDriverStatus === TruckDriverStatusEnum.RELEASED)
      throw new ForbiddenException('Truck Driver is released');
  }

  private openTrip(truckDriver: TruckDriver) {
    const trip: Trip = {
      isOpened: true,
      openedAt: new Date().toLocaleString('en-GB'),
      tripCheckPointList: [],
    };
    truckDriver.tripList.push(trip);
  }

  private haveTruckDriverOpenedTrip(truckDriver: TruckDriver) {
    return !!truckDriver.tripList.filter((trip) => trip.isOpened);
  }

  async closeBooking(bookingNumber: string) {
    const booking = await this.findBookingByNumber(bookingNumber);
    this.checkBookingNotFound(booking);
    this.checkBookingNotClosed(booking);
    for (const truckDriver of booking.truckDriverList) {
      if (this.haveTruckDriverOpenedTrip(truckDriver))
        throw new ForbiddenException(
          'Booking have opened Trips for truck driver',
        );
      await this.releaseTruckDriverForEndOfOperations(
        booking.bookingNumber,
        truckDriver,
      );
    }
    booking.bookingStatus = BookingStatus.CLOSED;
    booking.closedAt = new Date().toLocaleString('en-GB');
    return this.updateBooking(booking._id, booking);
  }
}
