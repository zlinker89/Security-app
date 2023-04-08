import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Application } from './entities/application.entity';
import { Menu } from './entities/menu.entity';
import { MenuOption } from './entities/menuOption.entity';
import { ApplicationService } from './services/application/application.service';
import { ApplicationRepository } from './repositories/application.repository';
import { ApplicationController } from './controllers/application/application.controller';
import { TenantModule } from '../tenant/tenant.module';
import { MenuController } from './controllers/menu/menu.controller';
import { MenuService } from './services/menu/menu.service';
import { MenuRepository } from './repositories/menu.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Application, Menu, MenuOption]), SharedModule, TenantModule],
    exports: [TypeOrmModule],
    providers: [ApplicationService, ApplicationRepository, MenuRepository, MenuService],
    controllers: [ApplicationController, MenuController]
})
export class ApplicationsModule {}
