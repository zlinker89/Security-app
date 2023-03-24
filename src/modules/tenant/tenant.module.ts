import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Tenant } from './entities/tenant.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([Tenant]), SharedModule],
    providers: [Tenant],
    exports: [TypeOrmModule, Tenant]
})
export class TenantModule {}
