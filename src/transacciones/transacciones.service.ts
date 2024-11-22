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
import { ForbiddenException } from '@nestjs/common';



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
async registrarTransacciones(rut_usuario: string, bulkTransaccionDto: BulkTransaccionDto) {
  const { transacciones } = bulkTransaccionDto;

  // Añadimos el rut_usuario a cada transacción
  const transaccionesConUsuario = transacciones.map((transaccion) => ({
    ...transaccion,
    rut_usuario, // Añadimos el rut_usuario a cada transacción
  }));

  console.log('Transacciones con rut añadido:', transaccionesConUsuario);

  try {
    // Guardamos las transacciones en la base de datos
    const resultado = await this.transaccionModel.insertMany(transaccionesConUsuario);
    return resultado;
  } catch (error) {
    // Si ocurre un error, lanzamos una excepción
    throw new Error(`Error al registrar transacciones: ${error.message}`);
  }
}

  //================================================================================================

  async update(id_transaccion: string, updateTransaccioneDto: UpdateTransaccioneDto, rut_usuario: string): Promise<Transaccion> {
    // Verificar si el RUT existe en alguna transacción
    const rutExists = await this.transaccionModel.exists({ rut_usuario });  // Busca si existe el RUT
    if (!rutExists) {
      // Si no existe el RUT, lanzamos un error 404
      throw new NotFoundException(`No existe transacción con el RUT ${rut_usuario}`);
    }

    // Buscar la transacción por ID
    const transaccion = await this.transaccionModel
      .findOne({ id_transaccion }) // Busca la transacción por su ID
      .exec();

    if (!transaccion) {
      // Si no se encuentra la transacción, lanzamos un error 404
      throw new NotFoundException(`No se encontró una transacción con el ID ${id_transaccion} para ese rut`);
    }

    // Verificar si el RUT coincide con el RUT de la transacción
    if (transaccion.rut_usuario !== rut_usuario) {
      // Si el RUT no coincide, lanzamos un error 403
      throw new ForbiddenException('No se puede actualizar la transacción porque no corresponde al RUT del usuario');
    }

    // Actualizamos los campos si están presentes en el DTO
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

    // Guardamos la transacción actualizada en la base de datos
    const transaccionActualizada = await transaccion.save();
    return transaccionActualizada;  // Retornamos la transacción actualizada
  }

//================================================================================================

async delete(id_transaccion: string, rut_usuario: string): Promise<void> {
  // Busca la transacción por el ID
  const transaccion = await this.transaccionModel
    .findOne({ id_transaccion }) // Busca la transacción por su ID
    .exec();

  // Si la transacción no existe, lanza un NotFoundException
  if (!transaccion) {
    throw new NotFoundException(
      `No se encontró una transacción con el ID ${id_transaccion}`,
    );
  }

  // Verifica si el rut_usuario coincide con el rut de la transacción
  if (transaccion.rut_usuario !== rut_usuario) {
    throw new ForbiddenException(
      'No se puede eliminar la transacción porque no corresponde al RUT proporcionado.',
    );
  }

  // Elimina la transacción
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
