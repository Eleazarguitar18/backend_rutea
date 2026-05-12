import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMailDto {
  @ApiProperty({
    description: 'Correo electrónico del destinatario',
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'El email no tiene un formato válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Asunto del correo',
    example: 'Bienvenida a Rutea',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Mensaje o contenido del correo',
    example: 'Hola, bienvenido a nuestra plataforma.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Nombre del destinatario',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class UpdateMailDto extends PartialType(CreateMailDto) {}
