import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { TenantModule } from '../tenant/tenant.module';
import { Role } from './entities/role.entity';
import { RoleService } from './services/role/role.service';
import { RoleRepository } from './repositories/roles.repository';
import { RoleController } from './controllers/role/role.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Role]), TenantModule, SharedModule],
    providers: [Role, RoleService, RoleRepository],
    exports: [TypeOrmModule, Role],
    controllers: [RoleController]
})
export class RolesModule {}
