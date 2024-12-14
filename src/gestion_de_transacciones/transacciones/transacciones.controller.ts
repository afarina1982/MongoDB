import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetTransaccioneDto } from './dto/get-transaccione.dto';
import { BulkTransaccionDto } from './dto/bulk-transaccione.dto';
import { NotFoundException } from '@nestjs/common';
import { FilterTransaccionesDto } from 'src/gestion_de_transacciones/transacciones/dto/filtertransacciones.dto';
import { Query } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { Transaccion } from 'src/gestion_de_transacciones/odm/schema/transacciones.schema';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) { }


  //================================================================================================
  @ApiHeader({ name: 'rut_usuario', required: true, description: 'RUT del usuario propietario de las transacciones', })
  @Post(':bulk')
  async registrarTransacciones(
    @Headers('rut_usuario') rut_usuario: string, // Extraemos el rut_usuario desde el header
    @Body() bulkTransaccionesDto: BulkTransaccionDto, // Recibimos el DTO con las transacciones
  ) {
    if (!rut_usuario) {
      // Si no existe rut_usuario en el header, lanzamos un error 403
      throw new ForbiddenException('El header "rut_usuario" es obligatorio');
    }

    // Llamamos al servicio para registrar las transacciones y le pasamos el rut_usuario
    return await this.transaccionesService.registrarTransacciones(rut_usuario, bulkTransaccionesDto);
  }
 
  //================================================================================================
  @Patch('/transaccion/:id_transaccion')
  @ApiParam({
    name: 'id_transaccion',
    description: 'ID de la transacción a actualizar',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Datos de la transacción a actualizar',
    type: UpdateTransaccioneDto,
  })
  @ApiOkResponse({
    description: 'Transacción actualizada correctamente',
    type: GetTransaccioneDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado, falta el header rut_usuario o no corresponde al RUT de la transacción',
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada o RUT no existe en la base de datos',
  })
  @ApiHeader({
    name: 'rut_usuario',  // Especificamos el nombre del header
    description: 'RUT del usuario propietario de la transacción',
    required: true,  // Indica que este header es obligatorio
  })
  async update(
    @Param('id_transaccion') id: string,  // Obtenemos el ID de la transacción
    @Body() updateTransaccioneDto: UpdateTransaccioneDto,  // Datos de la transacción a actualizar
    @Headers('rut_usuario') rut_usuario: string,  // RUT del usuario en el header
  ): Promise<GetTransaccioneDto> {
    // Verifica que el rut_usuario esté presente en el header
    if (!rut_usuario) {
      throw new ForbiddenException('El RUT del usuario es obligatorio en el header');
    }
  
    try {
      // Llama al servicio para realizar la actualización, pasando el rut_usuario como argumento
      return await this.transaccionesService.update(id, updateTransaccioneDto, rut_usuario);
    } catch (error) {
      // Si la transacción no es encontrada, lanzamos un error 404
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Si ocurre otro tipo de error, lo lanzamos con un mensaje personalizado
      throw new Error(`Error al actualizar la transacción: ${error.message}`);
    }
  }
  //================================================================================================
  @Delete('/transaccion/:id_transaccion')
  @ApiParam({
    name: 'id_transaccion',
    description: 'ID de la transacción a eliminar',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción eliminada correctamente',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado, falta el header rut_usuario o no corresponde al RUT de la transacción',
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada',
  })
  async delete(
    @Param('id_transaccion') id_transaccion: string, // Parametro de ID de la transacción
    @Headers('rut_usuario') rut_usuario: string,     // RUT del usuario en el encabezado
  ): Promise<void> {
    // Verifica que el rut_usuario esté presente en el encabezado
    if (!rut_usuario) {
      throw new ForbiddenException('El RUT del usuario es obligatorio en el header');
    }

    try {
      // Llama al servicio para eliminar la transacción, pasando el id y el rut_usuario
      await this.transaccionesService.delete(id_transaccion, rut_usuario);
    } catch (error) {
      throw error;
    }
  }
 //================================================================================================
 @ApiHeader({
  name: 'rut_usuario',
  description: 'RUT del usuario propietario de las transacciones (formato: xx.xxx.xxx-x)',
  required: true,
})
@ApiResponse({ status: 200, description: 'Lista de transacciones', type: [Transaccion] })
@Get()
async obtenerTransacciones(
  @Headers('rut_usuario') rut_usuario: string, // Extraemos el rut_usuario del header
  @Query() filtros: FilterTransaccionesDto, // Extraemos los filtros de la consulta
) {
  // Verificamos si el rut_usuario está presente en el header
  if (!rut_usuario) {
    throw new ForbiddenException('El header "rut_usuario" es obligatorio');
  }

  // Agregamos el rut_usuario a los filtros
  filtros.rut_usuario = rut_usuario;

  // Verificamos los datos antes de enviarlos al servicio
  console.log('Rut usuario:', rut_usuario);
  console.log('Filtros:', filtros);

  return this.transaccionesService.obtenerTransaccionesConFiltros(filtros);
}
  //================================================================================================
  @ApiHeader({ name: 'rut_usuario', required: true, description: 'RUT del usuario propietario de las transacciones', })
  @ApiBody({ type: CreateTransaccioneDto })
  @ApiResponse({ status: 201, type: GetTransaccioneDto })
  @Post()
  async create(
    @Headers('rut_usuario') rut_usuario: string,
    @Body() createTransaccioneDto: CreateTransaccioneDto
  ): Promise<GetTransaccioneDto> {
    if (!rut_usuario) {
      throw new ForbiddenException('El header "rut_usuario" es obligatorio');
    }
    return await this.transaccionesService.create(rut_usuario, createTransaccioneDto);
  }
}
