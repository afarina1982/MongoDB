import { IsInt, IsNumber, IsString } from 'class-validator';

export class ReportePromedioDiarioDto {
  @IsInt()
  usuarioId: number;

  @IsNumber()
  promedioDiario: number;

  @IsString()
  categoria: string;
}
