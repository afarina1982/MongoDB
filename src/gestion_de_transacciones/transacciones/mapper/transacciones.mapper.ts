import { CreateTransaccioneDto } from "../dto/create-transaccione.dto";
import { Transaccion } from "src/gestion_de_transacciones/odm/schema/transacciones.schema";
import { GetTransaccioneDto } from "../dto/get-transaccione.dto";


export class TransaccionMapper {
    // Mapea DTO a Esquema de MongoDB
    static dtoToSchema(dto: CreateTransaccioneDto, rut_usuario: string): Transaccion {
        const schema = new Transaccion();
        schema.id_transaccion = dto.id_transaccion;
        schema.monto = dto.monto;
        schema.categoria = dto.categoria;
        // Convertir la fecha de cadena a tipo Date
        schema.fecha = new Date(dto.fecha).toISOString().split('T')[0];  // Formato YYYY-MM-DD
        schema.descripcion = dto.descripcion;
        schema.rut_usuario = rut_usuario;
        return schema;
    }

    // Mapea Esquema de MongoDB a DTO
    static schemaToDto(schema: Transaccion): GetTransaccioneDto {
        const dto = new GetTransaccioneDto();
        dto.id_transaccion = schema.id_transaccion;
        dto.monto = schema.monto;
        dto.categoria = schema.categoria;
        // Retornar la fecha en el formato adecuado
        dto.fecha = new Date(schema.fecha).toISOString().split('T')[0];  // Formato YYYY-MM-DD
        dto.descripcion = schema.descripcion;
        dto.rut_usuario = schema.rut_usuario;
        return dto;
    }
}
