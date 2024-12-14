import { PartialType } from '@nestjs/swagger';
import { CreateReporteRangoMontoDto } from './create-reporte_rango_monto.dto';

export class UpdateReporteRangoMontoDto extends PartialType(CreateReporteRangoMontoDto) {}
