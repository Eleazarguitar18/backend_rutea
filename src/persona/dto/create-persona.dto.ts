import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePersonaDto {
  @ApiProperty({ example: 'Juan' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
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

export class UpdateCustomerDto extends PartialType(CreatePersonaDto) {}
