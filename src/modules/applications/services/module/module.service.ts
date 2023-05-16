import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { ModuleDto } from '../../dto/module.dto';
import { Module } from '../../entities/module.entity';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { FindOneOptions, Like } from 'typeorm';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { StateEnum, TypeFilter } from 'src/common/enum';
import { ModuleRepository } from '../../repositories/module.repository';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class ModuleService
implements IService<ModuleDto, Module>
{
private readonly table = 'module';
constructor(
  private readonly _moduleRepository: ModuleRepository,
  private readonly _tenantService: TenantService,
  private readonly _applicationService: ApplicationService,
) {}

async create(obj: ModuleDto): Promise<Module> {
  const tenant = await this._tenantService.findOne({
    where: { id: obj.tenantId }
  })
  const application = await this._applicationService.findOne({
    where: { id: obj.tenantId }
  })
  return await this._moduleRepository.save({
    name: obj.name,
    icon: obj.icon,
    tenant: tenant,
    application: application,
  });
}

async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<Module>> {
  const queryBuilder = this._moduleRepository.createQueryBuilder(
    this.table,
  );

  if (
    pageOptionsDto.criteriaSearch &&
    pageOptionsDto.search &&
    pageOptionsDto.typeFilter
  ) {
    let obj = {};
    obj[pageOptionsDto.criteriaSearch] =
      pageOptionsDto.typeFilter == TypeFilter.APPROX
        ? Like(`%${pageOptionsDto.search}%`)
        : `${pageOptionsDto.search}`;
    queryBuilder.where(obj);
  }

  queryBuilder
    .orderBy(
      this.table + '.' + pageOptionsDto.columnToSort,
      pageOptionsDto.order,
    )
    .skip(pageOptionsDto.skip)
    .take(pageOptionsDto.take);

  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();

  const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

  return new PageDto(entities, pageMetaDto);
}

async findOne(pre: FindOneOptions<Module>): Promise<Module>{
  return await this._moduleRepository.findOne(pre)
}
async update(id: number, obj: ModuleDto): Promise<Module> {
  const Module = await this._moduleRepository.findOne({
    where: [
      { state: StateEnum.ACTIVE, id: id },
      { state: StateEnum.INACTIVE, id: id },
    ],
  });
  if (!Module) throw new NotFoundException(`La aplicacion no existe`);
  const tenant = await this._tenantService.findOne({
    where: { id: obj.tenantId }
  })
  const application = await this._applicationService.findOne({
    where: { id: obj.tenantId }
  })
  const updatedModule = {
    id: Module.id,
    name: obj.name,
    tenant: tenant,
    application: application,
  };
  return await this._moduleRepository.save(updatedModule);
}

async remove(id: number): Promise<void> {
  const Module = await this._moduleRepository.findOne({
    where: { state: StateEnum.ACTIVE, id: id },
  });
  if (!Module) throw new NotFoundException(`el ${this.table} no existe`);
  Module.state = StateEnum.DELETED;
  await this._moduleRepository.save(Module);
}
}
