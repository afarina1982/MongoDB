import { Module } from '@nestjs/common';
import { ReporteMensualCategoriaService } from './reporte_mensual_categoria.service';
import { ReporteMensualCategoriaController } from './reporte_mensual_categoria.controller';

@Module({
  controllers: [ReporteMensualCategoriaController],
  providers: [ReporteMensualCategoriaService],
})
export class ReporteMensualCategoriaModule {}
