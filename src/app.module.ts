import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { Role } from './users/entities/role.enum';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Cargo } from './cargo/entities/cargo.entity';
import { CargoModule } from './cargo/cargo.module';
import { SubCargo } from './cargo/entities/subCargo.entity';
import { VesselModule } from './vessel/vessel.module';
import { Voyage } from './vessel/entities/voyage.entity';
import { Vessel } from './vessel/entities/vessel.entity';
import { ContractorModule } from './contractor/contractor.module';
import { Contractor } from './contractor/entities/contractor.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
import { ConfigModule } from '@nestjs/config';
import { BerthModule } from './berth/berth.module';
import * as process from 'process';
import { Berth } from './berth/entities/berth.entity';
import { WarehouseModule } from './warehouse/warehouse.module';
import { Warehouse } from './warehouse/entities/warehouse.entity';
import { PatternModule } from './pattern/pattern.module';
import { Pattern } from './pattern/entities/pattern.entity';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.${ENV}.env`,
    }),
    //MongooseModule.forRoot('mongodb://localhost:27417/nest'),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      /*host: process.env.DATABASE_IP,
      port: parseInt(process.env.DATABASE_PORT),*/
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Cargo,
        SubCargo,
        Vessel,
        Voyage,
        Contractor,
        Booking,
        Berth,
        Warehouse,
        Pattern,
      ],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    CargoModule,
    VesselModule,
    ContractorModule,
    BookingModule,
    BerthModule,
    WarehouseModule,
    PatternModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit(): Promise<any> {
    try {
      await this.usersService.findOneByEmail(
        'moustafa.elkhaiat@sescotrans.net',
      );
    } catch (error) {
      await this.usersService.create({
        name: 'Mustafa M. Elkhiat',
        role: Role.DEVELOPER,
        email: 'moustafa.elkhaiat@sescotrans.net',
      });
    }
  }
}
