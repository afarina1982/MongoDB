import { Injectable } from '@nestjs/common';
import { CreateReportePromedioDiarioDto } from './dto/create-reporte_promedio_diario.dto';
import { UpdateReportePromedioDiarioDto } from './dto/update-reporte_promedio_diario.dto';

@Injectable()
export class ReportePromedioDiarioService {
  create(createReportePromedioDiarioDto: CreateReportePromedioDiarioDto) {
    return 'This action adds a new reportePromedioDiario';
  }

  findAll() {
    return `This action returns all reportePromedioDiario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportePromedioDiario`;
  }

  update(id: number, updateReportePromedioDiarioDto: UpdateReportePromedioDiarioDto) {
    return `This action updates a #${id} reportePromedioDiario`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportePromedioDiario`;
  }
}
