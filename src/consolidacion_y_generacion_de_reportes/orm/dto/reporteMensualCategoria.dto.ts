import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsIn } from 'class-validator';

export class ReporteMensualCategoriaDto {
  @ApiProperty({
    description: 'El RUT del usuario',
    example: '12.345.678-9',
  })
  @IsString()
  rut_usuario: string;

  @ApiProperty({
    description: 'El mes del reporte (de 1 a 12)',
    example: 5,
  })
  @IsInt()
  @Min(1)
  @Max(12)
  mes: number;

  @ApiProperty({
    description: 'El año del reporte (mínimo 2000)',
    example: 2024,
  })
  @IsInt()
  @Min(2000)
  anio: number;

  @ApiProperty({
    description: 'La categoría asociada al reporte',
    example: 'tecnologia',
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
  ])
  categoria: string;

  @ApiProperty({
    description: 'El total de gasto en la categoría para el mes',
    example: 15000,
  })
  @IsInt()
  totalGasto: number;
}
