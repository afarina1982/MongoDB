import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateTransaccioneDto } from "./create-transaccione.dto";

export class BulkTransaccionDto {
   @IsString()
   @IsNotEmpty()
   @ApiProperty({ description: 'Rut del Usuario', example: '12345678-9' })
   rut_usuario: string;

   @ApiProperty({ description: 'Arreglo de transacciones', type: [CreateTransaccioneDto] })
   @IsArray()
   @ValidateNested({ each: true })
    @Type(() => CreateTransaccioneDto)
    transacciones: CreateTransaccioneDto[];
}
