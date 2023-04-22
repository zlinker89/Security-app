import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { SharedModule } from '../shared/shared.module';
import { TenantModule } from '../tenant/tenant.module';
import { User } from './entities/user.entity';
import { UsersService } from './services/users/users.service';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User]), TenantModule, RolesModule, SharedModule],
    providers: [UsersService, UserRepository],
    exports: [UsersService, TypeOrmModule],
    controllers: [UserController],
})
export class UsersModule {}
