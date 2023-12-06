import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';
import { ObjectId } from 'mongodb';
import { CreateTruckDriverDto } from './dto/create-truck-driver.dto';
import { ReleaseTruckDriverDto } from './dto/release-truck-driver.dto';
import { ReturnTruckDriverDto } from './dto/return-truck-driver.dto';
import { CreateBookingPatternDto } from './dto/create-booking-pattern.dto';
import { CreateTripCheckPointDto } from './dto/create-trip-check-point.dto';
import { CreateByInterceptor } from '../entity-audit/create-by.interceptor';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body(new ValidationPipe()) createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('/allOpened')
  findAllOpenedBookingList() {
    return this.bookingService.findAllOpeningBookingList();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.bookingService.findBooking(id);
  }

  @Get('bookingNumber/:bookingNumber')
  findOneByBookingNumber(@Param('bookingNumber') bookingNumber: string) {
    return this.bookingService.findBookingByNumber(bookingNumber);
  }

  @Get('workOrderNumber/:workOrderNumber')
  findOneByWorkOrderNumber(@Param('workOrderNumber') workOrderNumber: string) {
    return this.bookingService.findBookingByWorkOrderNumber(workOrderNumber);
  }

  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body(new ValidationPipe()) updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Post(':bookingNumber/truckDriver')
  addTruckDriverToBooking(
    @Param('bookingNumber') bookingNumber: string,
    @Body(new ValidationPipe()) createTruckDriverDto: CreateTruckDriverDto,
  ) {
    return this.bookingService.addTruckDriverToBooking(
      bookingNumber,
      createTruckDriverDto,
    );
  }

  @Put(':bookingNumber/maintenanceRelease')
  releaseTruckDriverForMaintenance(
    @Param('bookingNumber') bookingNumber: string,
    @Body(new ValidationPipe()) releaseTruckDriverDto: ReleaseTruckDriverDto,
  ) {
    return this.bookingService.releaseTruckDriverForMaintenance(
      bookingNumber,
      releaseTruckDriverDto,
    );
  }

  @Put(':bookingNumber/needlessRelease')
  releaseTruckDriverForNeedless(
    @Param('bookingNumber') bookingNumber: string,
    @Body(new ValidationPipe()) releaseTruckDriverDto: ReleaseTruckDriverDto,
  ) {
    return this.bookingService.releaseTruckDriverForNeedless(
      bookingNumber,
      releaseTruckDriverDto,
    );
  }

  @Put(':bookingNumber/returnBack')
  returnBackTruckDriver(
    @Param('bookingNumber') bookingNumber: string,
    @Body(new ValidationPipe()) returnTruckDriverDto: ReturnTruckDriverDto,
  ) {
    return this.bookingService.returnBackTruck(
      bookingNumber,
      returnTruckDriverDto,
    );
  }

  @Post(':bookingId/pattern')
  addPatternToBooking(
    @Param('bookingId', ParseObjectIdPipe) bookingId: ObjectId,
    @Body(new ValidationPipe()) createBookingPattern: CreateBookingPatternDto,
  ) {
    return this.bookingService.updatePatternToBooking(
      bookingId,
      createBookingPattern,
    );
  }

  @Put(':bookingId/pattern')
  editPatternOfBooking(
    @Param('bookingId', ParseObjectIdPipe) bookingId: ObjectId,
    @Body(new ValidationPipe()) createBookingPattern: CreateBookingPatternDto,
  ) {
    return this.bookingService.updatePatternToBooking(
      bookingId,
      createBookingPattern,
    );
  }

  @Post(':bookingNumber/tripCheckPoint')
  @UseInterceptors(CreateByInterceptor)
  @UseGuards(AuthGuard)
  addTripCheckPoint(
    @Param('bookingNumber') bookingNumber: string,
    @Body(new ValidationPipe()) createTripCheckPoint: CreateTripCheckPointDto,
  ) {
    return this.bookingService.addTripCheckPoint(
      bookingNumber,
      createTripCheckPoint,
    );
  }

  @Put(':bookingNumber/close')
  closeBooking(@Param('bookingNumber') bookingNumber: string) {
    return this.bookingService.closeBooking(bookingNumber);
  }
}
