import { Injectable } from '@nestjs/common';
import { CreateReporteRangoMontoDto } from './dto/create-reporte_rango_monto.dto';
import { UpdateReporteRangoMontoDto } from './dto/update-reporte_rango_monto.dto';

@Injectable()
export class ReporteRangoMontoService {
  create(createReporteRangoMontoDto: CreateReporteRangoMontoDto) {
    return 'This action adds a new reporteRangoMonto';
  }

  findAll() {
    return `This action returns all reporteRangoMonto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reporteRangoMonto`;
  }

  update(id: number, updateReporteRangoMontoDto: UpdateReporteRangoMontoDto) {
    return `This action updates a #${id} reporteRangoMonto`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporteRangoMonto`;
  }
}
