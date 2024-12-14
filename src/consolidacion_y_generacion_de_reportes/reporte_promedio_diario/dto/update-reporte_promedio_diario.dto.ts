import { PartialType } from '@nestjs/swagger';
import { CreateReportePromedioDiarioDto } from './create-reporte_promedio_diario.dto';

export class UpdateReportePromedioDiarioDto extends PartialType(CreateReportePromedioDiarioDto) {}
