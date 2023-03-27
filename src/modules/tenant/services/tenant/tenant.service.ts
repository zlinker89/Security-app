import { TenantRepository } from './../../repositories/tenant.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { TenantDto } from '../../dto/tenant.dto';
import { Tenant } from '../../entities/tenant.entity';
import { StateEnum } from 'src/common/enum';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { PageOptionsDto } from 'src/modules/shared/interfaces/ipagemeta/ipagemeta';

@Injectable()
export class TenantService implements IService<TenantDto, Tenant> {
  constructor(private readonly _tenantRepository: TenantRepository) {}

  async create(obj: TenantDto): Promise<Tenant> {
    return await this._tenantRepository.save({
      name: obj.name,
    });
  }

  async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<Tenant>> {
    const queryBuilder = this._tenantRepository.createQueryBuilder('tenant');

    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    if (pageOptionsDto.criteriaSearch && pageOptionsDto.search) {
      queryBuilder.where(':criteria = :id', {
        criteria: pageOptionsDto.criteriaSearch,
        search: pageOptionsDto.search,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
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
    tenant.state = StateEnum.INACTIVE;
    await this._tenantRepository.save(tenant);
  }
}
