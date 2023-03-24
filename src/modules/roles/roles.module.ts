import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { TenantModule } from '../tenant/tenant.module';
import { Role } from './entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role]), TenantModule, SharedModule],
    providers: [Role],
    exports: [TypeOrmModule, Role]
})
export class RolesModule {}
