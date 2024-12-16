import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReporteMensualCategoria } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_mensual_categoria.entity';
import { ReportePromedioDiario } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_promedio_diario.entity';
import { ReporteRangoMonto } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_rango_monto.entity';

@Injectable()
export class OrmService {
  constructor(
    @InjectRepository(ReporteMensualCategoria)
    private readonly reporteMensualRepo: Repository<ReporteMensualCategoria>,

    @InjectRepository(ReportePromedioDiario)
    private readonly reportePromedioRepo: Repository<ReportePromedioDiario>,

    @InjectRepository(ReporteRangoMonto)
    private readonly reporteRangoRepo: Repository<ReporteRangoMonto>,
  ) {}

  async getReporteMensualCategoria(rutUsuario: string) {
    return this.reporteMensualRepo.find({
      where: { rut_usuario: rutUsuario },
      order: { anio: 'DESC', mes: 'DESC', totalGasto: 'DESC' },
    });
  }

  async getReportePromedioDiario(categoria: string) {
    return this.reportePromedioRepo.find({
      where: { categoria },
      order: { promedioDiario: 'DESC' },
    });
  }

  async getReporteRangoMonto(categoria: string) {
    return this.reporteRangoRepo.find({
      where: { categoria },
      order: { rangoMonto: 'ASC' },
    });
  }
}
