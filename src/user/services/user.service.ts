import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { User } from 'src/user/entity/user.entity';
import { ConfigService } from '@nestjs/config';

// ... (import statements)

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const saltRounds: number = parseInt(this.configService.get("SALT_ROUNDS"), 10);
            const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
            const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
            return await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User with this email already exists.');
            } else {
                throw new Error('Internal server error');
            }
        }
    }

    async getById(userId: number): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ id: userId });
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ email: email });
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    async getAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new Error('Internal server error');
        }
    }



    async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            await this.userRepository.update(userId, updateUserDto);
            const updatedUser = await this.userRepository.findOneByOrFail({ id: userId });
            if (!updatedUser) {
                throw new NotFoundException('User not found');
            }
            return updatedUser;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not found');
            } else {
                throw new Error('Internal server error');
            }
        }
    }

    async delete(userId: string): Promise<string> {
        try {
            const result = await this.userRepository.delete(userId);
            if (result.affected === 0) {
                throw new NotFoundException('User not found');
            }
            return "User Deleted";
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not found');
            } else {
                throw new Error('Internal server error');
            }
        }
    }
}

