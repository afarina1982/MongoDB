import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransaccionesModule } from 'src/gestion_de_transacciones/transacciones/transacciones.module';
import { ValidationPipe } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('Descripcion de la API')
    .setVersion('1.0')
    .addTag('Reporte de Transacciones')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [TransaccionesModule], // OPCIONAL - PARA APLICAR A SOLO ALGUNOS MODULOS
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PUERTO_NEST || 3000);
}
bootstrap();



