import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'usuarios' })
export class Usuario {

    @Prop({ name: "_id" })
    _id: string;
    @Prop({ name: "nombre" })
    nombre: string;
    @Prop({ name: "correo" })
    correo: string;
    @Prop({ name: "telefono", type: String })
    telefono: string;
    @Prop({ name: "pedidos", type: [String] })
    pedidos: string[];
    @Prop({
        name: "direccion", raw: {
            "calle": { type: String },
            "ciudad": { type: String },
            "codigoPostal": { type: String }
        }, type: Object
    })
    direccion: Record<string, any>;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
