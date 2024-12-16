import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, IsIn } from 'class-validator';

export class ReportePromedioDiarioDto {
  @ApiProperty({
    description: 'El ID del usuario asociado al reporte',
    example: 12345,
  })
  @IsInt()
  usuarioId: number;

  @ApiProperty({
    description: 'El promedio diario de gasto del usuario',
    example: 120.5,
  })
  @IsNumber()
  promedioDiario: number;

  @ApiProperty({
    description: 'La categoría asociada al reporte',
    example: 'entretenimiento',
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
}
