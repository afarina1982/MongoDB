import { PartialType } from '@nestjs/swagger';
import { CreateTransaccioneDto } from './create-transaccione.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateTransaccioneDto 
 {

@ApiProperty({ description: 'Monto de la transaccion', example: '10000' })
monto: number;

@ApiProperty({ description: 'Categoria de la transaccion', example: 'comida' })
categoria: string;

@ApiProperty({ description: 'Fecha de la transaccion', example: '2021-10-10' })
fecha: string;

@ApiProperty({ description: 'Descripcion de la transaccion', example: 'compra de comida' })
descripcion: string;

}