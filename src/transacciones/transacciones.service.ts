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
import { QueryTransaccioneDto } from './dto/query-transaccione.dto';


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

  async getTransacciones(rut_usuario: string, query: QueryTransaccioneDto) {
    const filters: any = { rut_usuario }; // El usuario solo puede ver sus propias transacciones

    // Aplicar los filtros opcionales
    if (query.categoria) filters.categoria = query.categoria;
    if (query.montoMenorA) filters.monto = { $lt: query.montoMenorA };
    if (query.montoMayorA) filters.monto = { ...filters.monto, $gt: query.montoMayorA };
    if (query.fechaMenorA) filters.fecha = { $lt: query.fechaMenorA };
    if (query.fechaMayorA) filters.fecha = { ...filters.fecha, $gt: query.fechaMayorA };

    const transacciones = await this.transaccionModel.find(filters).exec();

    if (!transacciones.length) {
      throw new NotFoundException('No se encontraron transacciones con esos filtros.');
    }

    return transacciones; // O puedes devolver un DTO mapeado si es necesario
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
  
}
