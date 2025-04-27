import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SmsService } from 'src/sms/sms.service';
import { totp } from "otplib";
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SendOtpDto } from './dto/send-otp.dto';
import { LoginUserDto } from './dto/login-user.dto';

totp.options = {
    digits: 5,
    step: 300
}

@Injectable()
export class UserService {
    constructor(private readonly smsService: SmsService, private readonly prisma: PrismaService, private readonly jwt: JwtService ){}

    async sendOtp( sendOtpDto: SendOtpDto){
        try {
            const otp = totp.generate(sendOtpDto.phone + "nimadir")
            // await this.smsService.sendSmsToPhone(sendOtpDto.phone, otp)
            return { otp }
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException
        }
    }

    async register(data: CreateUserDto ) {
        try {
            const verifyOtp = totp.verify({ token: data.otp, secret: data.phone + "nimadir" })
            if (!verifyOtp) {
                return { message: 'phone or otp not provided' }
            }
            const newUser = await this.prisma.user.create({ data: {
                username: data.username,
                phone: data.phone,
                photo: data.photo
            } })
            return newUser
        } catch (error) {
            if (error.code === 'P2002') {
                throw new BadRequestException('Username already exists');
            }
            console.log(error.message);
            throw new InternalServerErrorException(error.message || 'Internal server error')
        }
    }

    async login( loginUserDto: LoginUserDto ) {
        try {
            const findData = await this.prisma.user.findFirst({ where: { phone: loginUserDto.phone }})
            if (!findData) {
                return { message: 'user not found' }
            }
            const token = this.jwt.sign({ id: findData.id, username: findData.username })
            return { token }
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException
        }
    }

    async getUser() {
        try {
            return await this.prisma.user.findMany()
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException('Internal server error')
        }
    }
}
