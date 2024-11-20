import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

console.log('USUARIO_DB:', process.env.DB_USER);
console.log('CLAVE_DB:', process.env.DB_PASS);
console.log('RUTA_DB:', process.env.DB_HOST);
console.log('PUERTO_DB:', process.env.DB_PORT);
console.log('NOMBRE_DB:', process.env.DB_NAME);



@Module({
    imports: [
        MongooseModule.forRoot(
          `mongodb://mongo:clave12345678@localhost:27017/reportes`
        )
      ],
})
export class OdmModule {}
//`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`