import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDate, Matches, IsIn } from 'class-validator';

export class FilterTransaccionesDto {
  @ApiPropertyOptional({
    description: 'RUT del usuario en formato 11.111.111-1',
    example: '12.345.678-9',
  })
  @IsOptional()
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}\-\d{1}$/, {
    message: 'El formato de RUT debe ser xx.xxx.xxx-x',
  })
  rut_usuario?: string;

  @ApiPropertyOptional({
    description: 'Categoría de la transacción',
    example: 'comida',
    enum: [
      'comida',
      'ropa',
      'tecnologia',
      'salud',
      'educacion',
      'transporte',
      'entretenimiento',
      'servicios',
      'otros',
    ],
  })
  @IsOptional()
  @IsString()
  @IsIn([
    'comida',
    'ropa',
    'tecnologia',
    'salud',
    'educacion',
    'transporte',
    'entretenimiento',
    'servicios',
    'otros',
  ], { message: 'La categoría debe ser uno de los valores permitidos.' })
  categoria?: string;

  @ApiPropertyOptional({
    description: 'Monto mínimo de la transacción',
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  montoMayorA?: number;

  @ApiPropertyOptional({
    description: 'Monto máximo de la transacción',
    example: 5000,
  })
  @IsOptional()
  @IsNumber()
  montoMenorA?: number;

  @ApiPropertyOptional({
    description: 'Fecha mínima de la transacción (ISO 8601)',
    example: '2021-01-01',
  })
  @IsOptional()
  @IsDate()
  fechaMayorA?: Date;

  @ApiPropertyOptional({
    description: 'Fecha máxima de la transacción (ISO 8601)',
    example: '2021-12-31',
  })
  @IsOptional()
  @IsDate()
  fechaMenorA?: Date;
}
