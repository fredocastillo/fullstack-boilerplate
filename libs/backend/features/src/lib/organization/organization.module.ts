import { Module } from '@nestjs/common';
import { BusinessAreaService } from './business-area/business-area.service';
import { LOBService } from './lob/lob.service';
import { ProgramService } from './program/program.service';

@Module({
  imports: [],
  providers: [BusinessAreaService, LOBService, ProgramService],
  exports: [BusinessAreaService, LOBService, ProgramService],
})
export class OrganizationModule {}
