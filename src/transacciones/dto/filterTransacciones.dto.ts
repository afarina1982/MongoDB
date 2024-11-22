import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate, Matches } from 'class-validator';

export class FilterTransaccionesDto {
  @ApiPropertyOptional({ description: 'RUT del usuario en formato 11.111.111-1' })
  @IsOptional()
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}\-\d{1}$/, {
    message: 'El formato de RUT debe ser xx.xxx.xxx-x',
  })
  rut_usuario?: string;

  @ApiPropertyOptional({ description: 'Categoría de la transacción' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({ description: 'Monto mínimo de la transacción' })
  @IsOptional()
  @IsNumber()
  montoMayorA?: number;

  @ApiPropertyOptional({ description: 'Monto máximo de la transacción' })
  @IsOptional()
  @IsNumber()
  montoMenorA?: number;

  @ApiPropertyOptional({ description: 'Fecha mínima de la transacción (ISO 8601)' })
  @IsOptional()
  @IsDate()
  fechaMayorA?: Date;

  @ApiPropertyOptional({ description: 'Fecha máxima de la transacción (ISO 8601)' })
  @IsOptional()
  @IsDate()
  fechaMenorA?: Date;
}
