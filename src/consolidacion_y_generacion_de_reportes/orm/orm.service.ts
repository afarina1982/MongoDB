import { Injectable } from '@nestjs/common';
import { CreateOrmDto } from './dto/create-orm.dto';
import { UpdateOrmDto } from './dto/update-orm.dto';

@Injectable()
export class OrmService {
  create(createOrmDto: CreateOrmDto) {
    return 'This action adds a new orm';
  }

  findAll() {
    return `This action returns all orm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orm`;
  }

  update(id: number, updateOrmDto: UpdateOrmDto) {
    return `This action updates a #${id} orm`;
  }

  remove(id: number) {
    return `This action removes a #${id} orm`;
  }
}
