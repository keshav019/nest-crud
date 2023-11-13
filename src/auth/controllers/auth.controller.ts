import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponseDto } from 'src/user/dto/loginResponse.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.authService.login(loginDto);
        return user;
    }
}
