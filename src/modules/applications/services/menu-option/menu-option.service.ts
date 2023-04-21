import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuOptionDto } from '../../dto/menuOption.dto';
import { MenuOption } from '../../entities/menuOption.entity';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { TenantService } from '../../../tenant/services/tenant/tenant.service';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { FindOneOptions, Like } from 'typeorm';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { MenuOptionRepository } from '../../repositories/menuOption.repository';
import { MenuService } from '../menu/menu.service';
import { StateEnum, TypeFilter } from 'src/common/enum';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class MenuOptionService implements IService<MenuOptionDto, MenuOption> {
  private readonly table = 'Menu';
  constructor(
    private readonly _menuOptionRepository: MenuOptionRepository,
    private readonly _menuService: MenuService,
    private readonly _tenantService: TenantService,
    private readonly _applicationRepository: ApplicationService,
  ) {}

  async create(obj: MenuOptionDto): Promise<MenuOption> {
    const menu = await this._menuService.findOne({
      where: { id: obj.menuId },
    });
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId },
    });
    const application = await this._applicationRepository.findOne({
      where: { id: obj.tenantId },
    });
    return await this._menuOptionRepository.save({
      label: obj.label,
      icon: obj.icon,
      routerLink: obj.routerLink,
      menu: menu,
      tenant: tenant,
      application: application,
    });
  }

  async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<MenuOption>> {
    const queryBuilder = this._menuOptionRepository.createQueryBuilder(
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

  async findOne(pre: FindOneOptions<MenuOption>): Promise<MenuOption> {
    return await this._menuOptionRepository.findOne(pre);
  }
  async update(id: number, obj: MenuOptionDto): Promise<MenuOption> {
    const menuOption = await this._menuOptionRepository.findOne({
      where: [
        { state: StateEnum.ACTIVE, id: id },
        { state: StateEnum.INACTIVE, id: id },
      ],
    });
    if (!menuOption) throw new NotFoundException(`La opcion de menu no existe`);
    const menu = await this._menuService.findOne({
      where: { id: obj.menuId },
    });
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId },
    });
    const application = await this._applicationRepository.findOne({
      where: { id: obj.tenantId },
    });
    const updatedMenu = {
      id: menuOption.id,
      label: obj.label,
      icon: obj.icon,
      routerLink: obj.routerLink,
      menu: menu,
      tenant: tenant,
      application: application,
    };
    return await this._menuOptionRepository.save(updatedMenu);
  }

  async remove(id: number): Promise<void> {
    const menuOption = await this._menuOptionRepository.findOne({
      where: { state: StateEnum.ACTIVE, id: id },
    });
    if (!menuOption) throw new NotFoundException(`La opcion de menu no existe`);
    menuOption.state = StateEnum.DELETED;
    await this._menuOptionRepository.save(menuOption);
  }
}
