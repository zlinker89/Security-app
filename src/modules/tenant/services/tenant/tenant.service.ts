import { TenantRepository } from './../../repositories/tenant.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { TenantDto } from '../../dto/tenant.dto';
import { Tenant } from '../../entities/tenant.entity';
import { StateEnum } from 'src/common/enum';

@Injectable()
export class TenantService implements IService<TenantDto, Tenant> {
  constructor(private readonly _tenantRepository: TenantRepository) {}

  async create(obj: TenantDto): Promise<Tenant> {
    return await this._tenantRepository.save({
        name: obj.name
    });
  }

  async findAll(): Promise<Tenant[]> {
    return await this._tenantRepository.find({
      where: { state: StateEnum.ACTIVE },
    });
  }

  async update(id: number, obj: TenantDto): Promise<Tenant> {
    const tenant = await this._tenantRepository.findOne({
      where: { state: StateEnum.ACTIVE, id: id },
    });
    if (!tenant) throw new NotFoundException('Este cliente no existe');
    const updatedTenant = Object.assign(tenant, obj);
    return await this._tenantRepository.save(updatedTenant);
  }

  async remove(id: number): Promise<void> {
    const tenant = await this._tenantRepository.findOne({
        where: { state: StateEnum.ACTIVE, id: id },
      });
    if (!tenant) throw new NotFoundException('Este cliente no existe');
    tenant.state = StateEnum.INACTIVE
    await this._tenantRepository.save(tenant);
  }
}
