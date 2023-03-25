import { TenantRepository } from './repositories/tenant.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Tenant } from './entities/tenant.entity';
import { SharedModule } from '../shared/shared.module';
import { TenantService } from './services/tenant/tenant.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tenant]), SharedModule],
    providers: [Tenant, TenantRepository, TenantService],
    exports: [TypeOrmModule, Tenant, TenantRepository, TenantService]
})
export class TenantModule {}
