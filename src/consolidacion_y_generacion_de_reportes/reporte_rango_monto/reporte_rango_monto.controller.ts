import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReporteRangoMontoService } from './reporte_rango_monto.service';
import { CreateReporteRangoMontoDto } from './dto/create-reporte_rango_monto.dto';
import { UpdateReporteRangoMontoDto } from './dto/update-reporte_rango_monto.dto';

@Controller('reporte-rango-monto')
export class ReporteRangoMontoController {
  constructor(private readonly reporteRangoMontoService: ReporteRangoMontoService) {}

  @Post()
  create(@Body() createReporteRangoMontoDto: CreateReporteRangoMontoDto) {
    return this.reporteRangoMontoService.create(createReporteRangoMontoDto);
  }

  @Get()
  findAll() {
    return this.reporteRangoMontoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reporteRangoMontoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReporteRangoMontoDto: UpdateReporteRangoMontoDto) {
    return this.reporteRangoMontoService.update(+id, updateReporteRangoMontoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reporteRangoMontoService.remove(+id);
  }
}
