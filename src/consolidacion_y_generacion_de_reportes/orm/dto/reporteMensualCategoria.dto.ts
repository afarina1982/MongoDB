import { IsInt, IsString, Max, Min } from 'class-validator';

export class ReporteMensualCategoriaDto {
  @IsString()
  rut_usuario: string;

  @IsInt()
  @Min(1)
  @Max(12)
  mes: number;

  @IsInt()
  @Min(2000) // Año mínimo razonable
  anio: number;

  @IsString()
  categoria: string;

  @IsInt()
  totalGasto: number;
}
