import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { encodePassword } from '../utilities/bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';
import { Role } from './entities/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await encodePassword('0000'),
      isActive: false,
      isEnabled: true,
    };
    /*const createdUser = new this.userModel(user);
    return createdUser.save();*/
    /*const { password, ...addedUser } = await this.userRepository.save(user);
    return addedUser;*/
    await this.userRepository.save(user);
    return this.findOneByEmail(user.email);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(_id: ObjectId) {
    const user = await this.userRepository.findOneBy({ _id });
    this.checkUserNotFound(user);
    return user;
  }

  async searchUsers(searchValue: string) {
    const users = await this.findAll();
    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.branch?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.role.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  async findUsersByRole(role: Role) {
    return this.userRepository.find({ role });
  }

  findVesselOfficerUserList() {
    return this.findUsersByRole(Role.VESSEL_OFFICER);
  }

  findWarehouseOfficerUserList() {
    return this.findUsersByRole(Role.WAREHOUSE_OFFICER);
  }

  private checkUserNotFound(user: User) {
    if (!user) throw new NotFoundException('User is not found');
  }

  async findOneByEmail(email: string) {
    //return this.userModel.findOne({ email }).lean();
    const user = await this.userRepository.findOneBy({ email });
    this.checkUserNotFound(user);
    return user;
  }

  async update(_id: ObjectId, updateUserDto: UpdateUserDto) {
    //return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
    await this.userRepository.update({ _id }, updateUserDto);
    return this.findOne(_id);
  }
}
