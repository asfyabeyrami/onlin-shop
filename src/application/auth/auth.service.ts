import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDataAccess } from 'src/dataAccess/users.dataAccess';
import { LoginUserDto, RegisterUserDto, UserDto } from 'src/DTO/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataAccess: UserDataAccess,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterUserDto): Promise<UserDto> {
    const { name, lastName, mobile, password } = payload;

    if (!name || !lastName || !mobile || !password) {
      throw new HttpException('همه فیلد ها الزامیست', 404);
    }

    const userChecking = await this.dataAccess.findByMobile(mobile);

    if (userChecking) {
      throw new HttpException('شماره مبایل تکراری میباشد', 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.dataAccess.createUser(
      name,
      lastName,
      mobile,
      hashedPassword,
    );
    return user;
  }

  async login(payload: LoginUserDto): Promise<{
    status: number;
    massege?: string;
    error?: string;
  }> {
    const { mobile, password } = payload;
    if (!mobile || !password) {
      throw new HttpException('همه فیلد ها الزامیست', 404);
    }

    const user = await this.dataAccess.findByMobile(mobile);
    if (!user) {
      throw new HttpException('کاربر وجود ندارد', 404);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException('پسورد صحیح نمی باشد', 404);
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      mobile: user.mobile,
    });
    const reslut = {
      status: 200,
      name: user.name,
      error: null,
      accessToken: token,
    };
    return reslut;
  }
}
