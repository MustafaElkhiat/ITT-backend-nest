import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { validatePassword } from '../utilities/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException();
    if (!validatePassword(pass, user?.password)) {
      throw new UnauthorizedException();
    }
    const { password, ...userDto } = user;
    const payload = { sub: user._id, email: user.email };
    return {
      userDto,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
