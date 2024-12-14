import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReporteMensualCategoriaService } from './reporte_mensual_categoria.service';
import { CreateReporteMensualCategoriaDto } from './dto/create-reporte_mensual_categoria.dto';
import { UpdateReporteMensualCategoriaDto } from './dto/update-reporte_mensual_categoria.dto';

@Controller('reporte-mensual-categoria')
export class ReporteMensualCategoriaController {
  constructor(private readonly reporteMensualCategoriaService: ReporteMensualCategoriaService) {}

  @Post()
  create(@Body() createReporteMensualCategoriaDto: CreateReporteMensualCategoriaDto) {
    return this.reporteMensualCategoriaService.create(createReporteMensualCategoriaDto);
  }

  @Get()
  findAll() {
    return this.reporteMensualCategoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reporteMensualCategoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReporteMensualCategoriaDto: UpdateReporteMensualCategoriaDto) {
    return this.reporteMensualCategoriaService.update(+id, updateReporteMensualCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reporteMensualCategoriaService.remove(+id);
  }
}
