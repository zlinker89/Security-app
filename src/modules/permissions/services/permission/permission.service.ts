import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { Permission } from '../../entities/permision.entity';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';
import { PermissionRepository } from '../../repositories/permission.repository';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { StateEnum, TypeFilter } from 'src/common/enum';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { FindOneOptions, Like } from 'typeorm';
import { PermissionDto } from '../../dto/permission.dto';
import { ModuleService } from 'src/modules/applications/services/module/module.service';

@Injectable()
export class PermissionService 
implements IService<PermissionDto, Permission>
{
private readonly table = 'permission';
constructor(
  private readonly _tenantService: TenantService,
  private readonly _moduleService: ModuleService,
  private readonly _roleRepository: PermissionRepository,
) {}

async create(obj: PermissionDto): Promise<Permission> {
  const tenant = await this._tenantService.findOne({
    where: { id: obj.tenantId }
  })
  const module = await this._moduleService.findOne({
    where: { id: obj.moduleId }
  })
  return await this._roleRepository.save({
    name: obj.name,
    ability: obj.ability,
    isGlobal: obj.isGlobal,
    tenant: tenant,
    module: module
  });
}

async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<Permission>> {
  const queryBuilder = this._roleRepository.createQueryBuilder(
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

async findOne(pre: FindOneOptions<Permission>): Promise<Permission>{
  return await this._roleRepository.findOne(pre)
}
async update(id: number, obj: PermissionDto): Promise<Permission> {
  const Permission = await this._roleRepository.findOne({
    where: [
      { state: StateEnum.ACTIVE, id: id },
      { state: StateEnum.INACTIVE, id: id },
    ],
  });
  if (!Permission) throw new NotFoundException(`El permiso no existe`);
  const tenant = await this._tenantService.findOne({
    where: { id: obj.tenantId }
  })
  const module = await this._moduleService.findOne({
    where: { id: obj.moduleId }
  })
  const updatedPermission = {
    id: Permission.id,
    name: obj.name,
    ability: obj.ability,
    isGlobal: obj.isGlobal,
    tenant: tenant,
    module: module,
  };
  return await this._roleRepository.save(updatedPermission);
}

async remove(id: number): Promise<void> {
  const Permission = await this._roleRepository.findOne({
    where: { state: StateEnum.ACTIVE, id: id },
  });
  if (!Permission) throw new NotFoundException(`el permiso no existe`);
  Permission.state = StateEnum.DELETED;
  await this._roleRepository.save(Permission);
}
}
