import { Role } from '../entities/role.enum';
import { IsDefined, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;
  @IsDefined()
  @IsNotEmpty()
  readonly branch?: string;
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
