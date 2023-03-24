import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Application } from './entities/application.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Application]), SharedModule],
    exports: [TypeOrmModule]
})
export class ApplicationsModule {}
