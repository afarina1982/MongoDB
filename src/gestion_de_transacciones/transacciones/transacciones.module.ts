import { Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaccion, TransaccionSchema } from 'src/gestion_de_transacciones/odm/schema/transacciones.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteMensualCategoria } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_mensual_categoria.entity';
import { ReporteRangoMonto } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_rango_monto.entity';
import { ReportePromedioDiario } from 'src/consolidacion_y_generacion_de_reportes/orm/entities/reporte_promedio_diario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReporteMensualCategoria]),
  TypeOrmModule.forFeature([Transaccion, ReporteRangoMonto, ReportePromedioDiario]),
    MongooseModule.forFeature([{
      name: Transaccion.name,
      schema: TransaccionSchema
    }])
  ],
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
})
export class TransaccionesModule {}
