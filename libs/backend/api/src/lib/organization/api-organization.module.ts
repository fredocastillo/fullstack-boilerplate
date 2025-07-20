import { Module } from '@nestjs/common';
import {
  BusinessAreaService,
  LOBService,
  ProgramService,
} from '@backend/features';
import { BusinessAreaController } from './business-area/business-area.controller';
import { LobController } from './lob/lob.controller';
import { ProgramController } from './program/program.controller';

@Module({
  imports: [],
  controllers: [BusinessAreaController, LobController, ProgramController],
  providers: [BusinessAreaService, LOBService, ProgramService],
})
export class ApiOrganizationModule {}
