import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Application } from './entities/application.entity';
import { Menu } from './entities/menu.entity';
import { MenuOption } from './entities/menuOption.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Application, Menu, MenuOption]), SharedModule],
    exports: [TypeOrmModule]
})
export class ApplicationsModule {}
