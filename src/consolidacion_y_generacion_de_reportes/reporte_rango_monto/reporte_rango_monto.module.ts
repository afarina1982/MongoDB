import { Module } from '@nestjs/common';
import { ReporteRangoMontoService } from './reporte_rango_monto.service';
import { ReporteRangoMontoController } from './reporte_rango_monto.controller';

@Module({
  controllers: [ReporteRangoMontoController],
  providers: [ReporteRangoMontoService],
})
export class ReporteRangoMontoModule {}
