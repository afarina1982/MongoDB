import { Controller, Get, Param, Query, BadRequestException } from '@nestjs/common';
import { OrmService } from './orm.service';

@Controller('reporte')
export class OrmController {
  constructor(private readonly ormService: OrmService) {}

  /**
   * Endpoint para obtener los reportes mensuales por categoría de un usuario.
   * @param rutUsuario RUT del usuario.
   * @returns Lista de reportes mensuales por categoría.
   */
  @Get('mensual_categoria/:rut_usuario')
  async getReporteMensualCategoria(
    @Param('rut_usuario') rutUsuario: string
  ) {
    if (!rutUsuario) {
      throw new BadRequestException('El RUT del usuario es requerido');
    }
    return this.ormService.getReporteMensualCategoria(rutUsuario);
  }

  /**
   * Endpoint para obtener el reporte de gasto promedio diario filtrado por categoría.
   * @param categoria Categoría a buscar.
   * @returns Lista de reportes de gasto promedio diario.
   */
  @Get('promedio_diario/:categoria')
  async getReportePromedioDiario(
    @Param('categoria') categoria: string
  ) {
    if (!categoria) {
      throw new BadRequestException('La categoría es requerida');
    }
    return this.ormService.getReportePromedioDiario(categoria);
  }

  /**
   * Endpoint para obtener el reporte de transacciones por rango de monto para una categoría.
   * @param categoria Categoría a buscar.
   * @returns Lista de reportes por rango de monto.
   */
  @Get('rango_monto/:categoria')
  async getReporteRangoMonto(
    @Param('categoria') categoria: string
  ) {
    if (!categoria) {
      throw new BadRequestException('La categoría es requerida');
    }
    return this.ormService.getReporteRangoMonto(categoria);
  }
}
