import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class ReporteRangoMontoDto {
  @ApiProperty({
    description: 'La categoría asociada al reporte',
    example: 'Alimentos',
  })
  @IsString()
  categoria: string;

  @ApiProperty({
    description: 'El rango de monto relacionado con la categoría',
    example: 5000.75,
  })
  @IsNumber()
  rangoMonto: number;

  @ApiProperty({
    description: 'La cantidad de transacciones realizadas en ese rango de monto',
    example: 150,
  })
  @IsInt()
  cantidadTransacciones: number;
}
