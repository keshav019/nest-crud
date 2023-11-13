import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).*$/,
        { message: 'Password must start with a letter, contain at least one capital letter, one special character, and one digit' }
    )
    password: string;
}
