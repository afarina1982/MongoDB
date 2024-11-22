import { Injectable } from '@nestjs/common';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaccion } from 'src/odm/schema/transacciones.schema';
import { TransaccionMapper } from './mapper/transacciones.mapper';
import { GetTransaccioneDto } from './dto/get-transaccione.dto';
import { BulkTransaccionDto } from './dto/bulk-transaccione.dto';
import { NotFoundException } from '@nestjs/common';
import { FilterTransaccionesDto } from './dto/filterTransacciones.dto';



@Injectable()
export class TransaccionesService {

  constructor(
    @InjectModel(Transaccion.name) private readonly transaccionModel: Model<Transaccion>
  ) { }

//================================================================================================
  async create(rut_usuario: string, createTransaccioneDto: CreateTransaccioneDto): Promise<GetTransaccioneDto> {
    const transaccion: Transaccion = TransaccionMapper.dtoToSchema(createTransaccioneDto, rut_usuario);
    const transaccionGuardado: Transaccion = await this.transaccionModel.create(transaccion);
    return TransaccionMapper.schemaToDto(transaccionGuardado);
  }

//================================================================================================
  async registrarTransacciones(bulkTransaccionDto: BulkTransaccionDto) {
    const { rut_usuario, transacciones } = bulkTransaccionDto;
    const transaccionesConUsuario = transacciones.map((transaccion) => ({
      ...transaccion,  
      rut_usuario,     
    }));
    console.log('Transacciones con rut añadido:', transaccionesConUsuario);
    try { 
      const resultado = await this.transaccionModel.insertMany(transaccionesConUsuario);
      return resultado;
    } catch (error) {
      throw new Error(`Error al registrar transacciones: ${error.message}`);
    }
  }

  //================================================================================================

  async update(id_transaccion: string, updateTransaccioneDto: UpdateTransaccioneDto): Promise<GetTransaccioneDto> {
    
    const transaccion = await this.transaccionModel
      .findOne({ id_transaccion }) 
      .exec();
    if (!transaccion) {
      throw new NotFoundException(
        `No se encontró una transacción con el ID ${id_transaccion}`,
      );
    }
    if (updateTransaccioneDto.monto !== undefined) {
      transaccion.monto = updateTransaccioneDto.monto;
    }
    if (updateTransaccioneDto.fecha !== undefined) {
      transaccion.fecha = updateTransaccioneDto.fecha;
    }
    if (updateTransaccioneDto.categoria !== undefined) {
      transaccion.categoria = updateTransaccioneDto.categoria;
    }
    if (updateTransaccioneDto.descripcion !== undefined) {
      transaccion.descripcion = updateTransaccioneDto.descripcion;
    }
    const transaccionActualizada = await transaccion.save();
    return TransaccionMapper.schemaToDto(transaccionActualizada);
  }
  
//================================================================================================

  async delete(id_transaccion: string): Promise<void> {
    const transaccion = await this.transaccionModel
      .findOne({ id_transaccion })
      .exec();
  
    if (!transaccion) {
      throw new NotFoundException(
        `No se encontró una transacción con el ID ${id_transaccion}`,
      );
    }
    await this.transaccionModel.deleteOne({ id_transaccion }).exec();
  }
  
//================================================================================================

async obtenerTransaccionesConFiltros(filtros: FilterTransaccionesDto): Promise<Transaccion[]> {
  const query: any = {};

  // Aseguramos que el rut_usuario esté en los filtros
  if (filtros.rut_usuario) {
    query.rut_usuario = filtros.rut_usuario; // Filtro por rut_usuario
  }

  // Otros filtros
  if (filtros.categoria) {
    query.categoria = filtros.categoria;
  }
  if (filtros.montoMayorA) {
    query.monto = { ...query.monto, $gte: filtros.montoMayorA };
  }
  if (filtros.montoMenorA) {
    query.monto = { ...query.monto, $lte: filtros.montoMenorA };
  }
  if (filtros.fechaMayorA) {
    query.fecha = { ...query.fecha, $gte: filtros.fechaMayorA };
  }
  if (filtros.fechaMenorA) {
    query.fecha = { ...query.fecha, $lte: filtros.fechaMenorA };
  }

  // Verificar la consulta antes de ejecutarla
  console.log('Consulta generada:', query);

  // Realizamos la consulta a la base de datos
  return this.transaccionModel.find(query).exec();
}

  
}
