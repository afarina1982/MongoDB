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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteMensualCategoria } from './consolidacion_y_generacion_de_reportes/orm/entities/reporte_mensual_categoria.entity';
import { ReportePromedioDiario } from './consolidacion_y_generacion_de_reportes/orm/entities/reporte_promedio_diario.entity';
import { ReporteRangoMonto } from './consolidacion_y_generacion_de_reportes/orm/entities/reporte_rango_monto.entity';
import { RequestMethod } from '@nestjs/common';

@Module({
  imports: [
    OdmModule,
    TransaccionesModule,
    GestionDeTransaccionesModule,
    ConsolidacionYGeneracionDeReportesModule,
    ReporteMensualCategoriaModule,
    ReporteRangoMontoModule,
    ReportePromedioDiarioModule,
    OrmModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST_MYSQL, // Para Trabajo Local 'localhost',
      port: parseInt(process.env.DB_PORT_MYSQL, 10), // Para Trabajo Local 3306, 
      username: process.env.DB_USER_MYSQL, // Para Trabajo Local'root',
      password: process.env.DB_PASS_MYSQL, // Para Trabajo Local 'clave123',
      database: process.env.DB_NAME_MYSQL, // Para Trabajo Local 'reportes',
      entities: [
        ReporteMensualCategoria,
        ReportePromedioDiario,
        ReporteRangoMonto,
      ],
      synchronize: true,  // Solo en desarrollo, para producción ponlo a false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RutMiddleware)
    .exclude({ path: 'transacciones/rango_monto/:categoria',method: RequestMethod.GET },
      { path: 'transacciones/promedio_diario/:categoria',method: RequestMethod.GET }
    )
    .forRoutes('*');
  }
  
}
