import { IsInt, IsNumber, IsString } from 'class-validator';

export class ReporteRangoMontoDto {
  @IsString()
  categoria: string;

  @IsNumber()
  rangoMonto: number;

  @IsInt()
  cantidadTransacciones: number;
}
