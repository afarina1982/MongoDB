import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmService } from './orm.service';
import { OrmController } from './orm.controller';
import { ReporteMensualCategoria } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_mensual_categoria.entity';
import { ReportePromedioDiario } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_promedio_diario.entity';
import { ReporteRangoMonto } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_rango_monto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReporteMensualCategoria, ReportePromedioDiario, ReporteRangoMonto])],
  controllers: [OrmController],
  providers: [OrmService],
})
export class OrmModule {}
