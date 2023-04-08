import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { MenuDto } from '../../dto/menu.dto';
import { Menu } from '../../entities/menu.entity';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { FindOneOptions, Like } from 'typeorm';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { StateEnum, TypeFilter } from 'src/common/enum';
import { MenuRepository } from '../../repositories/menu.repository';
import { ApplicationRepository } from '../../repositories/application.repository';

@Injectable()
export class MenuService
implements IService<MenuDto, Menu>
{
private readonly table = 'Menu';
constructor(
  private readonly _MenuRepository: MenuRepository,
  private readonly _tenantService: TenantService,
  private readonly _applicationRepository: ApplicationRepository,
) {}

async create(obj: MenuDto): Promise<Menu> {
  const tenant = await this._tenantService.findOne({
    where: { id: obj.tenantId }
  })
  const application = await this._applicationRepository.findOne({
    where: { id: obj.tenantId }
  })
  return await this._MenuRepository.save({
    name: obj.name,
    tenant: tenant,
    application: application,
  });
}

async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<Menu>> {
  const queryBuilder = this._MenuRepository.createQueryBuilder(
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

async findOne(pre: FindOneOptions<Menu>): Promise<Menu>{
  return await this._MenuRepository.findOne(pre)
}
async update(id: number, obj: MenuDto): Promise<Menu> {
  const Menu = await this._MenuRepository.findOne({
    where: [
      { state: StateEnum.ACTIVE, id: id },
      { state: StateEnum.INACTIVE, id: id },
    ],
  });
  if (!Menu) throw new NotFoundException(`La aplicacion no existe`);
  const tenant = await this._tenantService.findOne({
    where: { id: obj.tenantId }
  })
  const application = await this._applicationRepository.findOne({
    where: { id: obj.tenantId }
  })
  const updatedMenu = {
    id: Menu.id,
    name: obj.name,
    tenant: tenant,
    application: application,
  };
  return await this._MenuRepository.save(updatedMenu);
}

async remove(id: number): Promise<void> {
  const menu = await this._MenuRepository.findOne({
    where: { state: StateEnum.ACTIVE, id: id },
  });
  if (!menu) throw new NotFoundException(`La aplicacion no existe`);
  menu.state = StateEnum.DELETED;
  await this._MenuRepository.save(menu);
}
}
