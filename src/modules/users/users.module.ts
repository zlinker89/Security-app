import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { TenantModule } from '../tenant/tenant.module';
import { User } from './entities/user.entity';
import { UsersService } from './services/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), TenantModule, RolesModule],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
