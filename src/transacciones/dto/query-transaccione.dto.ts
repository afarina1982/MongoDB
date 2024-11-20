import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class QueryTransaccioneDto {
  @ApiPropertyOptional({ description: 'Categoría de la transacción', example: 'comida' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({ description: 'Monto menor que', example: 5000 })
  @IsOptional()
  @IsNumber()
  montoMenorA?: number;

  @ApiPropertyOptional({ description: 'Monto mayor que', example: 1000 })
  @IsOptional()
  @IsNumber()
  montoMayorA?: number;

  @ApiPropertyOptional({ description: 'Fecha menor que', example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  fechaMenorA?: string;

  @ApiPropertyOptional({ description: 'Fecha mayor que', example: '2022-01-01' })
  @IsOptional()
  @IsDateString()
  fechaMayorA?: string;
}
