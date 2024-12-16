import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { OrmService } from './orm.service';

@Controller('reporte')
export class OrmController {
  constructor(private readonly ormService: OrmService) {}

  @Get('mensual_categoria/:rut_usuario')
  async getReporteMensualCategoria(
    @Param('rut_usuario') rutUsuario: string
  ) {
    if (!rutUsuario) {
      throw new BadRequestException('El RUT del usuario es requerido');
    }
    return this.ormService.getReporteMensualCategoria(rutUsuario);
  }

  @Get('promedio_diario/:categoria')
  async getReportePromedioDiario(
    @Param('categoria') categoria: string
  ) {
    if (!categoria) {
      throw new BadRequestException('La categoría es requerida');
    }
    return this.ormService.getReportePromedioDiario(categoria);
  }

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
