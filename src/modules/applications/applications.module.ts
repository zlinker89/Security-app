import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Application } from './entities/application.entity';
import { Module as ModuleEntity } from './entities/module.entity';
import { MenuOption } from './entities/menuOption.entity';
import { ApplicationService } from './services/application/application.service';
import { ApplicationRepository } from './repositories/application.repository';
import { ApplicationController } from './controllers/application/application.controller';
import { TenantModule } from '../tenant/tenant.module';
import { ModuleController } from './controllers/module/module.controller';
import { ModuleService } from './services/module/module.service';
import { ModuleRepository } from './repositories/module.repository';
import { MenuOptionController } from './controllers/menu-option/menu-option.controller';
import { MenuOptionService } from './services/menu-option/menu-option.service';
import { MenuOptionRepository } from './repositories/menuOption.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Application, ModuleEntity, MenuOption]), SharedModule, TenantModule],
    exports: [TypeOrmModule, ApplicationService, ModuleService, MenuOptionService],
    providers: [ApplicationService, ApplicationRepository, ModuleRepository, 
        ModuleService, MenuOptionService, MenuOptionRepository],
    controllers: [ApplicationController, ModuleController, MenuOptionController]
})
export class ApplicationsModule {}
