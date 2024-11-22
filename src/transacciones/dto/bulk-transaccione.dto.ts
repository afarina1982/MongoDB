import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateTransaccioneDto } from "./create-transaccione.dto";

export class BulkTransaccionDto {
 
   @ApiProperty({ 
      description: 'Arreglo de transacciones', 
      type: [CreateTransaccioneDto], 
      example: [  // Aquí agregas un ejemplo de cómo deben lucir las transacciones sin el rut_usuario repetido.
         {
            id_transaccion: "550e8400-e29b-41d4-a716-446655440000",
            monto: 10000,
            categoria: "comida",
            fecha: "2024-11-20",
            descripcion: "compra de comida"
         },
         {
            id_transaccion: "550e8400-e29b-41d4-a716-446655440001",
            monto: 25000,
            categoria: "transporte",
            fecha: "2024-11-21",
            descripcion: "pago de transporte público"
         }
      ] 
   })
   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => CreateTransaccioneDto)
   transacciones: CreateTransaccioneDto[];
}
