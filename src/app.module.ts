import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OdmModule } from './odm/odm.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TransaccionesModule } from './transacciones/transacciones.module';

@Module({
  imports: [OdmModule, UsuarioModule, TransaccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

