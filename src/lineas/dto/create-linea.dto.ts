import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLineaDto {
  @ApiProperty({ description: 'Número o identificador de la línea', example: 'Línea 1' })
  @IsString({ message: 'El número debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número es requerido' })
  numero: string;

  @ApiProperty({ description: 'Color representativo de la línea', example: '#FF0000' })
  @IsString({ message: 'El color debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El color es requerido' })
  color: string;

  @ApiProperty({ description: 'Descripción de la línea', example: 'Ruta central' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  descripcion: string;

  estado: boolean = true;
  id_user_create: number;
  id_user_update?: number;
}

export class UpdateCustomerDto extends PartialType(CreateLineaDto) {}
