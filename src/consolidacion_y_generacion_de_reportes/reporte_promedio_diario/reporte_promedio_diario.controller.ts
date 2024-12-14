import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportePromedioDiarioService } from './reporte_promedio_diario.service';
import { CreateReportePromedioDiarioDto } from './dto/create-reporte_promedio_diario.dto';
import { UpdateReportePromedioDiarioDto } from './dto/update-reporte_promedio_diario.dto';

@Controller('reporte-promedio-diario')
export class ReportePromedioDiarioController {
  constructor(private readonly reportePromedioDiarioService: ReportePromedioDiarioService) {}

  @Post()
  create(@Body() createReportePromedioDiarioDto: CreateReportePromedioDiarioDto) {
    return this.reportePromedioDiarioService.create(createReportePromedioDiarioDto);
  }

  @Get()
  findAll() {
    return this.reportePromedioDiarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportePromedioDiarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportePromedioDiarioDto: UpdateReportePromedioDiarioDto) {
    return this.reportePromedioDiarioService.update(+id, updateReportePromedioDiarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportePromedioDiarioService.remove(+id);
  }
}
