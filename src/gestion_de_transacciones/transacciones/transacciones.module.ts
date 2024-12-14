import { Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaccion, TransaccionSchema } from 'src/gestion_de_transacciones/odm/schema/transacciones.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Transaccion.name,
      schema: TransaccionSchema
    }])
  ],
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
})
export class TransaccionesModule {}
