import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { toUserDto } from 'src/shared/mapper';
import * as bcrypt from 'bcrypt';;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }
    
    async create(userDto: CreateUserDto): Promise<UserDto>{
        const { username, password, email } = userDto;
        const userInDb = await this.userRepository.findOne({ where: { username } });
        if (userInDb) {
            throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepository.create({
            username,
            password,
            email,
        })
        try {
            await this.userRepository.save(user);
            return toUserDto(user);
  
        } catch(error) {
            console.log(error)
        }
    }

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepository.findOne(options)
        return toUserDto(user);
    }

    async findByLogin({ username, password }): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { username } })
        if (!user) {
            throw new HttpException(
                'User not found', HttpStatus.UNAUTHORIZED
            );
        }

        bcrypt.compare(password, user.password, (error, data) => {
            if (error) throw new HttpException(
                'Invalid Login credentials', HttpStatus.UNAUTHORIZED
            );
            
            if (data) {
                return data
            }
            
        })
        return toUserDto(user)
    }

    async findByPayload({ username } : any): Promise<UserDto>{
        return await this.userRepository.findOne({ where: { username } })
    }

}
