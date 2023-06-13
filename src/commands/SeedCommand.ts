import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';
import { RoleService } from 'src/modules/roles/services/role/role.service';
import { ApplicationService } from 'src/modules/applications/services/application/application.service';
import { TypeApp } from 'src/common/enum';
import { ModuleService } from 'src/modules/applications/services/module/module.service';
import { PermissionService } from 'src/modules/permissions/services/permission/permission.service';

@Injectable()
export class SeedCommand {
  constructor(
    private readonly _tenantService: TenantService,
    private readonly _rolService: RoleService,
    private readonly _applicationService: ApplicationService,
    private readonly _moduleService: ModuleService,
    private readonly _permissionService: PermissionService,
    private readonly userService: UsersService,
  ) {}

  @Command({
    command: 'seed:initial',
    describe: 'Seed initial',
  })
  async create() {
    try {
      console.log('Creating client');
      const client1 = await this._tenantService.create({
        id: 0,
        name: 'Client 1',
      });
      console.log('Creating rol: administrador');
      const rolAdmin = await this._rolService.create({
        name: 'Admin',
        tenantId: client1.id,
      });
      console.log('Creating first app');
      const appWeb = await this._applicationService.create({
        name: 'Web',
        tenantId: client1.id,
        typeApp: TypeApp.WEB,
      });
      console.log('Creating module');
      const module1 = await this._moduleService.create({
        name: 'Configuración',
        icon: 'settings',
        tenantId: client1.id,
        applicationId: appWeb.id,
      });
      console.log('Creating permissions');
      const permissions = [
        { name: 'Ver todos clientes', ability: 'tenant:all', isGlobal: true},
        { name: 'Ver cliente propio', ability: 'tenant:only', isGlobal: true},
        { name: 'Crear cliente', ability: 'tenant:create', isGlobal: false},
        { name: 'Actualizar cliente', ability: 'tenant:update', isGlobal: false},
        { name: 'Eliminar cliente', ability: 'tenant:delete', isGlobal: false},
      ]
      const permissionCreateds = []
      for (const permission of permissions) {
        const permissionCreated = await this._permissionService.create({
          name: permission.name,
          ability: permission.ability,
          isGlobal: permission.isGlobal,
          tenantId: client1.id,
          moduleId: module1.id
        });
        permissionCreateds.push(permissionCreated)
      }
      console.log('setting permissions to rol');
      await this._rolService.updatePermission(rolAdmin.id, permissionCreateds, [])
      
    } catch (error) {
      throw error;
    }
  }
}
