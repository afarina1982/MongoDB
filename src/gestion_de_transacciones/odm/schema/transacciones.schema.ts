import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ collection: 'transacciones' })
export class Transaccion {

    @Prop({ name: "id_transaccion", type: String })
    id_transaccion: string;

    @Prop({ name: "monto", type: Number })
    monto: number;

    @Prop({ name: "categoria", type: String })
    categoria: string;

    @Prop({ name: "fecha", type: String })
    fecha: string;

    @Prop({ name: "descripcion", type: String })
    descripcion: string;

    @Prop({ name: "rut_usuario", type: String })
    rut_usuario: string;
}
export const TransaccionSchema = SchemaFactory.createForClass(Transaccion);