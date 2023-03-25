import { Injectable } from '@nestjs/common';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { DataSource, Repository } from 'typeorm';
import { TenantDto } from '../dto/tenant.dto';
import { Tenant } from '../entities/tenant.entity';

@Injectable()
export class TenantRepository
  extends Repository<Tenant>
{
  constructor(private dataSource: DataSource) {
    super(Tenant, dataSource.createEntityManager());
  }

}
