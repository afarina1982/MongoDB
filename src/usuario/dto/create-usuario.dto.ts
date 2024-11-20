import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
    @ApiProperty({description:'Identificador Unico', example: '123456789'})
    id: string;
    @ApiProperty({description:'Nombre usuario', example: 'Juan Perez'})
    nombre: string;
    @ApiProperty({description:'Correo Electronico del Usuario', example: 'aaaa.cl'})
    correo: string;
    @ApiProperty({description:'Numero de Telefono del Usuario', example: '555555'})
    telefono: string;
    @ApiProperty({description:'calle de la direccion del Ususario', example: 'Calle 123'})
    calle: string;
    @ApiProperty({description:'Ciudad del Usuario', example: 'Santiago'})
    ciudad: string;
    @ApiProperty({description:'Codigo Posta Usuario', example: '2002000'})
    codigoPostal: string
}  
