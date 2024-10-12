import { Controller, HttpException, HttpStatus, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload, LoginStatus, RegistrationStatus } from 'src/shared/helpers';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus>{
        const result: RegistrationStatus = await this.authService.register(createUserDto,)
        if (!result.success) {
           throw new HttpException (result.message, HttpStatus.BAD_REQUEST)
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus>{
        return await this.authService.login(loginUserDto)
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<JwtPayload>{
        return req.user
    }
}
