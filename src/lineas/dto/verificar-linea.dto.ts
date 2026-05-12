import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerificarLineaDto {
  @ApiProperty({
    description: 'Número o nombre de la línea a verificar',
    example: 'Línea 1',
  })
  @IsString({ message: 'El número debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de línea es requerido' })
  numero: string;
}
