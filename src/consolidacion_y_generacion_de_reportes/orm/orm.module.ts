import { Module } from '@nestjs/common';
import { OrmService } from './orm.service';
import { OrmController } from './orm.controller';

@Module({
  controllers: [OrmController],
  providers: [OrmService],
})
export class OrmModule {}
