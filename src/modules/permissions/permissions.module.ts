import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Permission } from './entities/permision.entity';
import { PermissionService } from './services/permission/permission.service';
import { PermissionController } from './controllers/permission/permission.controller';
import { PermissionRepository } from './repositories/permission.repository';
import { TenantModule } from '../tenant/tenant.module';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
    imports: [TypeOrmModule.forFeature([Permission]), TenantModule, ApplicationsModule],
    exports: [TypeOrmModule, PermissionRepository, PermissionService],
    providers: [PermissionService, PermissionRepository],
    controllers: [PermissionController]
})
export class PermissionsModule {}
