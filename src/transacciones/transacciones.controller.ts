import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetTransaccioneDto } from './dto/get-transaccione.dto';
import { BulkTransaccionDto } from './dto/bulk-transaccione.dto';
import { NotFoundException } from '@nestjs/common';
import { FilterTransaccionesDto } from 'src/transacciones/dto/filterTransacciones.dto';
import { Query } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { Transaccion } from 'src/odm/schema/transacciones.schema';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) { }

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

  //================================================================================================

  @Post(':bulk')
  async registrarTransacciones(@Body() bulkTransaccionesDto: BulkTransaccionDto) {
    return await this.transaccionesService.registrarTransacciones(bulkTransaccionesDto);
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
  @Patch('/transaccion/:id_transaccion')
  @ApiParam({
    name: 'id_transaccion',
    description: 'Id de la transaccion a actualizar',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Datos de la transaccion a actualizar',
    type: UpdateTransaccioneDto,
  })
  @ApiOkResponse({
    description: 'Transaccion actualizada correctamente',
    type: GetTransaccioneDto,
  })
  async update(
    @Param('id_transaccion') id: string,
    @Body() updateTransaccioneDto: UpdateTransaccioneDto): Promise<GetTransaccioneDto> {
    try {
      return await this.transaccionesService.update(id, updateTransaccioneDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al actualizar la transaccion: ${error.message}`);
    }
  }
//================================================================================================
  @Delete('/transaccion/:id_transaccion')
  async delete(@Param('id_transaccion') id_transaccion: string): Promise<void> {
    try {
      await this.transaccionesService.delete(id_transaccion);
    } catch (error) {
      throw new NotFoundException(
        `No se pudo eliminar la transacción con el ID ${id_transaccion}`,
      )
    }
  }


}
