import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}
