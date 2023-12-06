import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoExceptionFilter } from '../mongo-exception/mongo-exception.filter';
import { ParseObjectIdPipe } from '../parse-object-id/parse-object-id.pipe';
import { ObjectId } from 'mongodb';
import { Role } from './entities/role.enum';

@Controller('api/users')
//@UseGuards(AuthGuard)
//@UseInterceptors(UsersInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  //@UseInterceptors(CreateEntityAuditInterceptor)
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  //@Roles(Role.DEVELOPER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Put(':id')
  @UseFilters(MongoExceptionFilter)
  //@UseInterceptors(EditEntityAuditInterceptor)
  update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get('role/:role')
  findUserListByRole(@Param('role') role: Role) {
    return this.usersService.findUsersByRole(role);
  }

  @Get('/search/query')
  getDocs(@Query('searchValue') searchValue: string) {
    return this.usersService.searchUsers(searchValue);
  }
}
