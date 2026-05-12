import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LineasService } from './lineas.service';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { VerificarLineaDto } from './dto/verificar-linea.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/auth_public.decorator';

@ApiTags('lineas')
@Controller('lineas')
export class LineasController {
  constructor(private readonly lineasService: LineasService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear una nueva línea' })
  @ApiBody({ type: CreateLineaDto })
  async create(@Body() createLineaDto: CreateLineaDto) {
    return await this.lineasService.create(createLineaDto);
  }

  @Get('listar')
  @ApiOperation({ summary: 'Obtener todas las líneas completas' })
  async findAll() {
    return await this.lineasService.findAll();
  }

  @Public()
  @Get('nombres')
  @ApiOperation({ summary: 'Obtener solo el número (nombre) de todas las líneas' })
  async findAllNombres() {
    return await this.lineasService.findAllNombres();
  }

  @Get('resumen/:id')
  @ApiOperation({ summary: 'Obtener solo el número y descripción de una línea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la línea', example: 1 })
  async findOneResumen(@Param('id') id: string) {
    return await this.lineasService.findOneResumen(+id);
  }

  @Public()
  @Post('verificar')
  @ApiOperation({ summary: 'Verificar si una línea ya existe en la base de datos' })
  @ApiBody({ type: VerificarLineaDto })
  async verificarLinea(@Body() dto: VerificarLineaDto) {
    return await this.lineasService.existeLinea(dto.numero);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una línea completa por ID' })
  @ApiParam({ name: 'id', description: 'ID de la línea', example: 1 })
  findOne(@Param('id') id: string) {
    return this.lineasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una línea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la línea', example: 1 })
  @ApiBody({ type: UpdateLineaDto })
  update(@Param('id') id: string, @Body() updateLineaDto: UpdateLineaDto) {
    return this.lineasService.update(+id, updateLineaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (desactivar) una línea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la línea', example: 1 })
  remove(@Param('id') id: string) {
    return this.lineasService.remove(+id);
  }
}
