import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from '../tenant/tenant.module';
import { Role } from './entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role]), TenantModule],
    providers: [Role],
    exports: [TypeOrmModule, Role]
})
export class RolesModule {}
