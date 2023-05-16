import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MenuOption } from '../entities/menuOption.entity';

@Injectable()
export class MenuOptionRepository
  extends Repository<MenuOption>
{
  constructor(private dataSource: DataSource) {
    super(MenuOption, dataSource.createEntityManager());
  }
}
