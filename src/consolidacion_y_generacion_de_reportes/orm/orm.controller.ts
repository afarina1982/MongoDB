import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrmService } from './orm.service';
import { CreateOrmDto } from './dto/create-orm.dto';
import { UpdateOrmDto } from './dto/update-orm.dto';

@Controller('orm')
export class OrmController {
  constructor(private readonly ormService: OrmService) {}

  @Post()
  create(@Body() createOrmDto: CreateOrmDto) {
    return this.ormService.create(createOrmDto);
  }

  @Get()
  findAll() {
    return this.ormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ormService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrmDto: UpdateOrmDto) {
    return this.ormService.update(+id, updateOrmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ormService.remove(+id);
  }
}
