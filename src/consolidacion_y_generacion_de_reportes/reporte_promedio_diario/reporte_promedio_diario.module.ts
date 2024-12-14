import { Module } from '@nestjs/common';
import { ReportePromedioDiarioService } from './reporte_promedio_diario.service';
import { ReportePromedioDiarioController } from './reporte_promedio_diario.controller';

@Module({
  controllers: [ReportePromedioDiarioController],
  providers: [ReportePromedioDiarioService],
})
export class ReportePromedioDiarioModule {}
