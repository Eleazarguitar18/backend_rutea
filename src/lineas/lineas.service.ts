import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLineaDto } from './dto/create-linea.dto';
import { UpdateLineaDto } from './dto/update-linea.dto';
import { Repository } from 'typeorm';
import { Linea } from './entities/linea.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LineasService {
  constructor(
    @InjectRepository(Linea)
    private lineasRepository: Repository<Linea>,
  ) {}
  async create(createLineaDto: CreateLineaDto) {
    const linea = this.lineasRepository.create(createLineaDto);
    return await this.lineasRepository.save(linea);
  }

  async findAll() {
    const data = await this.lineasRepository.find();
    if (data.length === 0) {
      throw new NotFoundException(`No existen datos de lineas`);
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.lineasRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException(`No existen datos de la linea`);
    }
    return data;
  }

  async update(id: number, updateLineaDto: UpdateLineaDto) {
    // 1. Preload busca la entidad por ID y le "encima" los nuevos datos del DTO
    const linea = await this.lineasRepository.preload({
      id: id,
      ...updateLineaDto,
    });

    // 2. Si preload no encuentra nada, devuelve undefined
    if (!linea) {
      throw new NotFoundException(`La línea con ID ${id} no existe`);
    }

    // 3. Guardamos los cambios (esto disparará las validaciones y los suscriptores)
    try {
      return await this.lineasRepository.save(linea);
    } catch (error) {
      // Manejo de errores por si hay nombres duplicados en las líneas
      throw new Error('Error al actualizar la línea: ' + error.message);
    }
  }

  async remove(id: number) {
    const data = await this.lineasRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException(`La linea con ID ${id} no existe`);
    }
    data.estado = false;
    try {
      return await this.lineasRepository.save(data);
    } catch (error) {
      // Manejo de errores por si hay nombres duplicados en las líneas
      throw new Error('Error al actualizar la línea: ' + error.message);
    }
  }

  /** Devuelve solo el número (nombre) de todas las líneas */
  async findAllNombres(): Promise<{ id: number; numero: string }[]> {
    const data = await this.lineasRepository.find({
      select: ['id', 'numero'],
    });
    if (data.length === 0) {
      throw new NotFoundException('No existen líneas registradas');
    }
    return data;
  }

  /** Devuelve solo el número y la descripción de una línea por ID */
  async findOneResumen(id: number): Promise<{ numero: string; descripcion: string }> {
    const data = await this.lineasRepository.findOne({
      where: { id },
      select: ['numero', 'descripcion'],
    });
    if (!data) {
      throw new NotFoundException(`No existe la línea con ID ${id}`);
    }
    return data;
  }

  /** Verifica si una línea con ese número ya existe en la BD */
  async existeLinea(numero: string): Promise<{ existe: boolean; mensaje: string }> {
    const linea = await this.lineasRepository.findOne({ where: { numero } });
    if (linea) {
      return { existe: true, mensaje: `La línea "${numero}" ya existe en la base de datos` };
    }
    return { existe: false, mensaje: `La línea "${numero}" no existe en la base de datos` };
  }
}
