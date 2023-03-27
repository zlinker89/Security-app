import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';

@Injectable()
export class SeedCommand {
  constructor(
    private readonly _tenantService: TenantService,
    private readonly userService: UsersService
    ) {}

  @Command({
    command: 'seed:initial',
    describe: 'Seed initial',
  })
  async create() {
    console.log('Hola')
    const client1 = await this._tenantService.create({
      id: 0,
      name: "Cliente 1"
    })
    /**
     * {
      where: { state: StateEnum.ACTIVE },
    }
     */
    console.log(client1)

  }
}
