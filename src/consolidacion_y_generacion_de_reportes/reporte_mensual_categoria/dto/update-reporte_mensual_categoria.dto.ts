import { PartialType } from '@nestjs/swagger';
import { CreateReporteMensualCategoriaDto } from './create-reporte_mensual_categoria.dto';

export class UpdateReporteMensualCategoriaDto extends PartialType(CreateReporteMensualCategoriaDto) {}
