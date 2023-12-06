import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateEntityAuditMiddleware } from './entity-audit/create-entity-audit-middleware.service';
import { ModifyEntityAuditMiddleware } from './entity-audit/modify-entity-audit-middleware.service';
import { UsersService } from './users/users.service';
import { Role } from './users/entities/role.enum';
import { AuthModule } from './auth/auth.module';
import { encodePassword } from './utilities/bcrypt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27417/nest'),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(CreateEntityAuditMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
    consumer
      .apply(ModifyEntityAuditMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.PUT });
  }

  async onModuleInit(): Promise<any> {
    const developer = await this.usersService.findOneByEmail(
      'moustafa.elkhaiat@sescotrans.net',
    );
    if (developer) return;
    else
      await this.usersService.create({
        name: 'Mustafa M. Elkhiat',
        role: Role.DEVELOPER,
        email: 'moustafa.elkhaiat@sescotrans.net',
      });
  }
}
