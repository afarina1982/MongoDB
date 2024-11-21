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


  async create(createTransaccioneDto: CreateTransaccioneDto): Promise<GetTransaccioneDto> {
    const transaccion: Transaccion = TransaccionMapper.dtoToSchema(createTransaccioneDto);
    const transaccionGuardado: Transaccion = await this.transaccionModel.create(transaccion);
    console.log(transaccionGuardado);
    return TransaccionMapper.schemaToDto(transaccionGuardado);
  }

  async registrarTransacciones(bulkTransaccionDto: BulkTransaccionDto) {
    const { rut_usuario, transacciones } = bulkTransaccionDto;

    // Mapeamos las transacciones y les añadimos el rut_usuario correctamente
    const transaccionesConUsuario = transacciones.map((transaccion) => ({
      ...transaccion,  // Asegúrate de que cada transacción tenga todos los campos correctamente
      rut_usuario,     // Añadimos el rut_usuario aquí para cada transacción
    }));

    // Verifica que la estructura es correcta antes de la inserción
    console.log('Transacciones con rut añadido:', transaccionesConUsuario);

    try {
      // Inserta todas las transacciones correctamente formateadas
      const resultado = await this.transaccionModel.insertMany(transaccionesConUsuario);
      return resultado;
    } catch (error) {
      throw new Error(`Error al registrar transacciones: ${error.message}`);
    }
  }

  async update(id_transaccion: string, updateTransaccioneDto: UpdateTransaccioneDto): Promise<GetTransaccioneDto> {
    // Buscar la transacción por el campo id_transaccion
    const transaccion = await this.transaccionModel
      .findOne({ id_transaccion }) // Cambiamos findById por findOne
      .exec();
  
    if (!transaccion) {
      throw new NotFoundException(
        `No se encontró una transacción con el ID ${id_transaccion}`,
      );
    }
  
    // Actualizamos los campos permitidos
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
  
    // Guardar la transacción actualizada
    const transaccionActualizada = await transaccion.save();
  
    return TransaccionMapper.schemaToDto(transaccionActualizada);
  }
  

  async delete(id_transaccion: string): Promise<void> {
    // Buscar la transacción por el campo id_transaccion
    const transaccion = await this.transaccionModel
      .findOne({ id_transaccion })
      .exec();
  
    if (!transaccion) {
      throw new NotFoundException(
        `No se encontró una transacción con el ID ${id_transaccion}`,
      );
    }
  
    // Eliminar la transacción
    await this.transaccionModel.deleteOne({ id_transaccion }).exec();
  }
  
  async obtenerTransaccionesConFiltros(filtros: FilterTransaccionesDto): Promise<Transaccion[]> {
    const query: any = {};
  
    if (filtros.rut_usuario) {
      query.rut_usuario = filtros.rut_usuario;
    }
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
  
    return this.transaccionModel.find(query).exec();
  }
  
}
