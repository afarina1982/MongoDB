import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OdmModule } from './gestion_de_transacciones/odm/odm.module';
import { TransaccionesModule } from 'src/gestion_de_transacciones/transacciones/transacciones.module';
import { RutMiddleware } from './middleware/rut.middleware';
import { GestionDeTransaccionesModule } from './gestion_de_transacciones/gestion_de_transacciones.module';
import { ConsolidacionYGeneracionDeReportesModule } from './consolidacion_y_generacion_de_reportes/consolidacion_y_generacion_de_reportes.module';
import { ReporteMensualCategoriaModule } from './consolidacion_y_generacion_de_reportes/reporte_mensual_categoria/reporte_mensual_categoria.module';
import { ReporteRangoMontoModule } from './consolidacion_y_generacion_de_reportes/reporte_rango_monto/reporte_rango_monto.module';
import { ReportePromedioDiarioModule } from './consolidacion_y_generacion_de_reportes/reporte_promedio_diario/reporte_promedio_diario.module';
import { OrmModule } from './consolidacion_y_generacion_de_reportes/orm/orm.module';


@Module({
  imports: [OdmModule, TransaccionesModule, GestionDeTransaccionesModule, ConsolidacionYGeneracionDeReportesModule, ReporteMensualCategoriaModule, ReporteRangoMontoModule, ReportePromedioDiarioModule, OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RutMiddleware)
    .forRoutes('*');
  }
}

