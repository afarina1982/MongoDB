import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccioneDto } from './dto/create-transaccione.dto';
import { UpdateTransaccioneDto } from './dto/update-transaccione.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { GetTransaccioneDto } from './dto/get-transaccione.dto';
import { BulkTransaccionDto } from './dto/bulk-transaccione.dto';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) { }
  @ApiBody({ type: CreateTransaccioneDto })
  @ApiResponse({ status: 201, type: CreateTransaccioneDto })
  @Post()
  async create(@Body() createTransaccioneDto: CreateTransaccioneDto): Promise<GetTransaccioneDto> {
    return await this.transaccionesService.create(createTransaccioneDto);
  }


  @Post(':bulk')
  async registrarTransacciones(@Body() bulkTransaccionesDto: BulkTransaccionDto){
    return await this.transaccionesService.registrarTransacciones(bulkTransaccionesDto);
  }



  @Get()
  findAll() {
    return this.transaccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransaccioneDto: UpdateTransaccioneDto) {
    return this.transaccionesService.update(+id, updateTransaccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaccionesService.remove(+id);
  }
}
