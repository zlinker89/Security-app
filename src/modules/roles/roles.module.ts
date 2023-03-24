import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [Role],
    exports: [TypeOrmModule, Role]
})
export class RolesModule {}
