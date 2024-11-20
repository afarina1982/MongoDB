import { Usuario } from "src/odm/schema/usuario.schema";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { GetUsuarioDto } from "../dto/get-usuario.dto";

export class UsuarioMapper {
    static dtoToSchema(dto: CreateUsuarioDto) :Usuario{
        const schema = new Usuario();
        schema._id = dto.id;
        schema.nombre = dto.nombre;
        schema.correo = dto.correo;
        schema.telefono = dto.telefono;
        schema.direccion = {
            calle: dto.calle,
            ciudad: dto.ciudad,
            codigoPostal: dto.codigoPostal
        }
        return schema;
        
    }

static schemaToDto(schema: Usuario): GetUsuarioDto{
    const dto = new GetUsuarioDto();
    dto.id = schema._id;
    dto.nombre = schema.nombre;
    dto.correo = schema.correo;
    dto.telefono = schema.telefono;
    if (schema.direccion){
    dto.calle = schema.direccion.calle;
    dto.ciudad = schema.direccion.ciudad;
    dto.codigoPostal = schema.direccion.codigoPostal;
    }
    return dto;
    }

}


