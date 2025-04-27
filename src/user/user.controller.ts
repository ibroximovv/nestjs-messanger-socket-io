import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('send-otp')
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.userService.sendOtp(sendOtpDto)
  }

  @Post('register')
  register(@Body() createUSerDto: CreateUserDto ){
    return this.userService.register(createUSerDto)
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.userService.login(loginUserDto)
  }
}
