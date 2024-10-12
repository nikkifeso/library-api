import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload, RegistrationStatus, LoginStatus } from 'src/shared/helpers';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {
    }

    private _createToken({ username }: UserDto): any{
        const user: JwtPayload = { username }
        const expiresIn = process.env.EXPIRES_IN
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }

    async register(userDto: CreateUserDto): Promise<RegistrationStatus>{
        let status: RegistrationStatus = {
            success: true,
            message: 'User Registered',
        };

        try {
            await this.usersService.create(userDto);
        } catch (error) {
            status = {
                success: false,
                message: error,
            };
        }
        return status;
    };

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus>{
        const user = await this.usersService.findByLogin(loginUserDto);
        const token = this._createToken(user)
        return {
            username: user.username,
            ...token
        };
    };

    async validateUser(payload: JwtPayload): Promise<UserDto>{
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }


}
