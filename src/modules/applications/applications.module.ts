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
import { MenuOptionController } from './controllers/menu-option/menu-option.controller';
import { MenuOptionService } from './services/menu-option/menu-option.service';
import { MenuOptionRepository } from './repositories/menuOption.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Application, Menu, MenuOption]), SharedModule, TenantModule],
    exports: [TypeOrmModule],
    providers: [ApplicationService, ApplicationRepository, MenuRepository, 
        MenuService, MenuOptionService, MenuOptionRepository],
    controllers: [ApplicationController, MenuController, MenuOptionController]
})
export class ApplicationsModule {}
