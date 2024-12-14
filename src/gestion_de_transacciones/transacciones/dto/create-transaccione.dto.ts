import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator";

export class CreateTransaccioneDto {
    @IsUUID('4', { message: 'El ID debe ser un UUID válido (v4).' }) // Valida que sea un UUID v4
    @ApiProperty({description: 'Identificador único en formato UUID',example: '550e8400-e29b-41d4-a716-446655440000',})
    id_transaccion: string;
   
    @ApiProperty({ description: 'Monto de la transaccion', example: '10000' })
    monto: number;
   
    @ApiProperty({ description: 'Categoria de la transaccion', example: 'comida' })
    categoria: string;
   
    @ApiProperty({ description: 'Fecha de la transaccion', example: '2021-10-10' })
    fecha: string;
   
    @ApiProperty({ description: 'Descripcion de la transaccion', example: 'compra de comida' })
    descripcion: string;
   
}
