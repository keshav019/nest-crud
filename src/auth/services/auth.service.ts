import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponseDto } from 'src/user/dto/loginResponse.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        try {
            const user = await this.userService.getByEmail(loginDto.email);
            if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
                throw new UnauthorizedException("Bad credential!");
            }
            const payload = { email: user.email };
            const token = await this.jwtService.signAsync(payload);
            return {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token: token
            };

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not found');
            } else {
                throw new Error('Internal server error');
            }
        }
    }
}
