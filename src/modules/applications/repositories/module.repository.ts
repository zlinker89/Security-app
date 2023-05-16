import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Module } from '../entities/module.entity';

@Injectable()
export class ModuleRepository
  extends Repository<Module>
{
  constructor(private dataSource: DataSource) {
    super(Module, dataSource.createEntityManager());
  }

}
