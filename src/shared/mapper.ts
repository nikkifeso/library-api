import { UserEntity } from "src/users/entity/user.entity";
import { UserDto } from "src/users/dto/user.dto";

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email };
    return userDto;
}