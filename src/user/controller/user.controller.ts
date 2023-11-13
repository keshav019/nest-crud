import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/services/user.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        const createdUser = await this.userService.create(createUserDto);
        return {
            id: createdUser.id,
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
            email: createdUser.email,
        };
    }


    @Get(':id')
    async getById(@Param('id') userId: number): Promise<UserDto> {
        const user = await this.userService.getById(userId);
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        };
    }


    @Get()
    async getAll(): Promise<UserDto[]> {
        const users = await this.userService.getAll();
        return users.map(user => ({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }));
    }

    @UseGuards(JwtAuthGuard) 
    @Patch(':id')
    async update(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
        console.log(updateUserDto)
        const updatedUser = await this.userService.update(userId, updateUserDto);
        return {
            id: updatedUser.id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') userId: string): Promise<void> {
        await this.userService.delete(userId);
    }
}

