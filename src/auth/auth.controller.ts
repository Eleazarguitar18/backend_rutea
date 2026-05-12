import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/auth_public.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ConfirmCodeDto,
  ConfirmPasswordChangeDto,
  RequestResetCodeDto,
} from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Public()
  // @Post('register')
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   try {
  //     return this.authService.create(createAuthDto);
  //   } catch (error) {
  //     // puedes inspeccionar el error y lanzar un HttpException
  //     throw new HttpException(
  //       {
  //         status: error.status || 500,
  //         message: error.message || 'Error al crear la persona',
  //         details: error.detail || null, // opcional, por ejemplo para errores de DB
  //       },
  //       error.status || 500,
  //     );
  //   }
  // }
  @Public()
  @ApiOperation({ summary: 'Iniciar sesión' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
  @Public()
  @ApiOperation({ summary: 'Refrescar token de acceso' })
  @Post('refresh_token')
  async refresh_token(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.authService.refresh_token(token);
  }
  @Public()
  @ApiOperation({ summary: 'Solicitar código de recuperación de contraseña' })
  @ApiBody({ type: RequestResetCodeDto })
  @Post('reset/code')
  async requestPasswordChange(@Body() emailDto: RequestResetCodeDto) {
    return this.authService.requestPasswordChange(emailDto.email);
  }

  @Public()
  @ApiOperation({ summary: 'Cambiar contraseña usando el código recibido' })
  @ApiBody({ type: ConfirmPasswordChangeDto })
  @Post('reset-confirm')
  async confirmPasswordChange(@Body() resetDto: ConfirmPasswordChangeDto) {
    return this.authService.confirmPasswordChange(
      resetDto.email,
      resetDto.newPassword,
    );
  }

  @Public()
  @ApiOperation({ summary: 'Confirmar código de recuperación' })
  @ApiBody({ type: ConfirmCodeDto })
  @Post('confirm-code')
  async confirmCode(@Body() resetDto: ConfirmCodeDto) {
    return await this.authService.confirmCode(resetDto.email, resetDto.code);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
