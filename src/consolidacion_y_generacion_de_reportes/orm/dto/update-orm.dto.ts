import { PartialType } from '@nestjs/swagger';
import { CreateOrmDto } from './create-orm.dto';

export class UpdateOrmDto extends PartialType(CreateOrmDto) {}
