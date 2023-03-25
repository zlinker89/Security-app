import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Permission } from './entities/permision.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    exports: [TypeOrmModule]
})
export class PermissionsModule {}
