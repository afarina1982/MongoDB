import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OdmModule } from './odm/odm.module';
import { TransaccionesModule } from './transacciones/transacciones.module';

@Module({
  imports: [OdmModule, TransaccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

