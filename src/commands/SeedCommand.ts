import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users/users.service';

@Injectable()
export class SeedCommand {
  constructor(private readonly userService: UsersService) {}

  @Command({
    command: 'seed:initial',
    describe: 'Seed initial',
  })
  async create() {
    console.log('Hola')
  }
}
