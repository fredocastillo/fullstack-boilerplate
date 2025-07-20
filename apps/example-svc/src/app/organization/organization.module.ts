import { Module } from '@nestjs/common';
import { ApiOrganizationModule } from '@backend/api';

@Module({
  imports: [ApiOrganizationModule],
})
export class OrganizationModule {}
