import { CreateTransaccioneDto } from "../dto/create-transaccione.dto";
import { Transaccion } from "src/gestion_de_transacciones/odm/schema/transacciones.schema";
import { GetTransaccioneDto } from "../dto/get-transaccione.dto";

export class TransaccionMapper {
    static dtoToSchema(dto: CreateTransaccioneDto, rut_usuario:string) :Transaccion{
        const schema = new Transaccion();
        schema.id_transaccion = dto.id_transaccion;
        schema.monto = dto.monto;
        schema.categoria = dto.categoria;
        schema.fecha = dto.fecha;
        schema.descripcion = dto.descripcion;
        schema.rut_usuario = rut_usuario;
        return schema;
        
    }

    static schemaToDto(schema: Transaccion): GetTransaccioneDto{
        const dto = new GetTransaccioneDto();
        dto.id_transaccion = schema.id_transaccion;
        dto.monto = schema.monto;
        dto.categoria = schema.categoria;
        dto.fecha = schema.fecha;
        dto.descripcion = schema.descripcion;
        dto.rut_usuario = schema.rut_usuario;
        return dto;
    }
}

