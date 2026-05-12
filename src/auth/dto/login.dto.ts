import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'usuario@example.com' })
    @IsNotEmpty({ message: 'El email es requerido' })
    @IsEmail({}, { message: 'El email no tiene un formato valido' })
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña no es un formato valida' })
    password: string;
}