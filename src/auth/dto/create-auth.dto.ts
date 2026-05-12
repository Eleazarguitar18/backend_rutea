import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'Nombre de usuario', required: false })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'usuario@example.com' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  estado: boolean = true;

  // datos de la persona
  @ApiProperty({ example: 'Juan' })
  @IsString({ message: 'Los nombres deben ser una cadena de texto' })
  @IsNotEmpty({ message: 'Los nombres son requeridos' })
  nombres: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El primer apellido es requerido' })
  p_apellido: string;

  @ApiProperty({ example: 'García' })
  @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El segundo apellido es requerido' })
  s_apellido: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  fecha_nacimiento: Date;

  @ApiProperty({ example: 'Masculino' })
  @IsString({ message: 'El género debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El género es requerido' })
  genero: string;
}
