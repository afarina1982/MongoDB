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

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) { }
  @ApiBody({ type: CreateTransaccioneDto })
  @ApiResponse({ status: 201, type: CreateTransaccioneDto })
  @Post()
  async create(@Body() createTransaccioneDto: CreateTransaccioneDto): Promise<GetTransaccioneDto> {
    return await this.transaccionesService.create(createTransaccioneDto);
  }

  @Post(':bulk')
  async registrarTransacciones(@Body() bulkTransaccionesDto: BulkTransaccionDto) {
    return await this.transaccionesService.registrarTransacciones(bulkTransaccionesDto);
  }
  @Get()
  async obtenerTransacciones(@Query() filtros: FilterTransaccionesDto) {
    return this.transaccionesService.obtenerTransaccionesConFiltros(filtros);
  }

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

  @Get()
  async obtenerTransaccionesConFiltros(@Query() filtros: FilterTransaccionesDto) {
    return this.transaccionesService.obtenerTransaccionesConFiltros(filtros);
  }


}
