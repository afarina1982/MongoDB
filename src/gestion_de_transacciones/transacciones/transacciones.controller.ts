import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query, ForbiddenException, NotFoundException } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { ApiBody, ApiOkResponse, ApiParam, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { GetTransaccioneDto } from './dto/get-transaccione.dto';
import { BulkTransaccionDto } from './dto/bulk-transaccione.dto';
import { FilterTransaccionesDto } from 'src/gestion_de_transacciones/transacciones/dto/filterTransacciones.dto';
import { Transaccion } from 'src/gestion_de_transacciones/odm/schema/transacciones.schema';
import { UpdateResultDto } from 'src/gestion_de_transacciones/transacciones/dto/updateResult.dto';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) { }

  //================================================================================================
  @ApiHeader({ name: 'rut_usuario', required: true, description: 'RUT del usuario propietario de las transacciones' })
  @Post(':bulk')
  async registrarTransacciones(
    @Headers('rut_usuario') rut_usuario: string,
    @Body() bulkTransaccionesDto: BulkTransaccionDto
  ) {
    if (!rut_usuario) {
      throw new ForbiddenException('El header "rut_usuario" es obligatorio');
    }
    await this.transaccionesService.registrarTransacciones(rut_usuario, bulkTransaccionesDto);
    await this.transaccionesService.sincronizarReporteMensual(rut_usuario); // Sincroniza el reporte
    await this.transaccionesService.sincronizarReporteRangoMonto();
    return { message: 'Transacciones registradas y reporte sincronizado.' };
  }

  //================================================================================================
  @Patch('/transaccion/:id_transaccion')
  @ApiParam({ name: 'id_transaccion', description: 'ID de la transacción a actualizar', required: true, type: String })
  @ApiBody({ description: 'Datos de la transacción a actualizar', type: UpdateTransaccioneDto })
  @ApiOkResponse({ description: 'Transacción actualizada correctamente', type: UpdateResultDto })
  @ApiResponse({ status: 403, description: 'Acceso denegado, falta el header rut_usuario' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  @ApiHeader({ name: 'rut_usuario', description: 'RUT del usuario propietario de la transacción', required: true })
  async update(
    @Param('id_transaccion') id: string,
    @Body() updateTransaccioneDto: UpdateTransaccioneDto,
    @Headers('rut_usuario') rut_usuario: string,
  ): Promise<UpdateResultDto> {
    if (!rut_usuario) {
      throw new ForbiddenException('El RUT del usuario es obligatorio en el header');
    }
    await this.transaccionesService.update(id, updateTransaccioneDto, rut_usuario);
    await this.transaccionesService.sincronizarReporteMensual(rut_usuario);
    await this.transaccionesService.sincronizarReporteRangoMonto();

    return {
      id_transaccion: id,
      message: 'Transacción actualizada y reporte sincronizado.'
    };
  }
  //================================================================================================
  @Delete('/transaccion/:id_transaccion')
  @ApiParam({ name: 'id_transaccion', description: 'ID de la transacción a eliminar', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Transacción eliminada correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado, falta el header rut_usuario' })
  @ApiResponse({ status: 404, description: 'Transacción no encontrada' })
  async delete(
    @Param('id_transaccion') id_transaccion: string,
    @Headers('rut_usuario') rut_usuario: string,
  ): Promise<{ message: string }> {
    if (!rut_usuario) {
      throw new ForbiddenException('El RUT del usuario es obligatorio en el header');
    }
    await this.transaccionesService.delete(id_transaccion, rut_usuario);
    await this.transaccionesService.sincronizarReporteMensual(rut_usuario);
    await this.transaccionesService.sincronizarReporteRangoMonto();

    return { message: 'Transacción eliminada y reporte sincronizado.' };
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
    @Headers('rut_usuario') rut_usuario: string,
    @Query() filtros: FilterTransaccionesDto
  ) {
    if (!rut_usuario) {
      throw new ForbiddenException('El header "rut_usuario" es obligatorio');
    }
    filtros.rut_usuario = rut_usuario;
    return this.transaccionesService.obtenerTransaccionesConFiltros(filtros);
  }

  //================================================================================================
  @ApiHeader({ name: 'rut_usuario', required: true, description: 'RUT del usuario propietario de las transacciones' })
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
    const result = await this.transaccionesService.create(rut_usuario, createTransaccioneDto);
    await this.transaccionesService.sincronizarReporteMensual(rut_usuario); // Sincroniza el reporte
    await this.transaccionesService.sincronizarReporteRangoMonto();
    return result;
  }

  //================================================================================================
  @Get('reporte/mensual_categoria')
  async generarReporteMensual(@Headers('rut_usuario') rut_usuario: string) {
    if (!rut_usuario) {
      throw new ForbiddenException('El header "rut_usuario" es obligatorio');
    }
    return this.transaccionesService.generarReporteMensual(rut_usuario);
  }
  //================================================================================================

  @Get('rango_monto/:categoria')
  async getReportePorRangoMonto(@Param('categoria') categoria: string) {
    return this.transaccionesService.getReportePorRangoMonto(categoria);
  }
  //================================================================================================
  @Get('promedio_diario/:categoria')
  async getPromedioDiario(@Param('categoria') categoria: string) {
    return this.transaccionesService.getPromedioDiario(categoria);
  }

}
