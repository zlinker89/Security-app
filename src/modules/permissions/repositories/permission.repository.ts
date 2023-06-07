import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Permission } from '../entities/permision.entity';

@Injectable()
export class PermissionRepository
  extends Repository<Permission>
{
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }
}