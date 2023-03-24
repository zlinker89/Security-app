import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Tenant } from './entities/tenant.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tenant])],
    providers: [Tenant],
    exports: [TypeOrmModule, Tenant]
})
export class TenantModule {}
