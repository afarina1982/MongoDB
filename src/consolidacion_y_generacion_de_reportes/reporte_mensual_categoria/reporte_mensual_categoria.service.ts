import { Injectable } from '@nestjs/common';
import { CreateReporteMensualCategoriaDto } from './dto/create-reporte_mensual_categoria.dto';
import { UpdateReporteMensualCategoriaDto } from './dto/update-reporte_mensual_categoria.dto';

@Injectable()
export class ReporteMensualCategoriaService {
  create(createReporteMensualCategoriaDto: CreateReporteMensualCategoriaDto) {
    return 'This action adds a new reporteMensualCategoria';
  }

  findAll() {
    return `This action returns all reporteMensualCategoria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reporteMensualCategoria`;
  }

  update(id: number, updateReporteMensualCategoriaDto: UpdateReporteMensualCategoriaDto) {
    return `This action updates a #${id} reporteMensualCategoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporteMensualCategoria`;
  }
}
