import { Role } from '../entities/role.enum';
import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;
  @IsDefined()
  @IsNotEmpty()
  role: Role;
  @IsDefined()
  @IsNotEmpty()
  branch?: string;
  @IsDefined()
  @IsEmail()
  email: string;
}
