import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { RoleDto } from '../../dto/role.dto';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { StateEnum, TypeFilter } from 'src/common/enum';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { FindOneOptions, Like } from 'typeorm';
import { RoleRepository } from '../../repositories/roles.repository';
import { Permission } from 'src/modules/permissions/entities/permision.entity';

@Injectable()
export class RoleService implements IService<RoleDto, Role> {
  private readonly table = 'role';
  constructor(
    private readonly _tenantService: TenantService,
    private readonly _roleRepository: RoleRepository,
  ) {}

  async create(obj: RoleDto): Promise<Role> {
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId },
    });
    return await this._roleRepository.save({
      name: obj.name,
      tenant: tenant,
    });
  }

  async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<Role>> {
    const queryBuilder = this._roleRepository.createQueryBuilder(this.table);

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

  async findOne(pre: FindOneOptions<Role>): Promise<Role> {
    return await this._roleRepository.findOne(pre);
  }
  async update(id: number, obj: RoleDto): Promise<Role> {
    const Role = await this._roleRepository.findOne({
      where: [
        { state: StateEnum.ACTIVE, id: id },
        { state: StateEnum.INACTIVE, id: id },
      ],
    });
    if (!Role) throw new NotFoundException(`El rol no existe`);
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId },
    });
    const updatedRole = {
      id: Role.id,
      name: obj.name,
      tenant: tenant,
    };
    return await this._roleRepository.save(updatedRole);
  }

  async remove(id: number): Promise<void> {
    const Role = await this._roleRepository.findOne({
      where: { state: StateEnum.ACTIVE, id: id },
    });
    if (!Role) throw new NotFoundException(`el rol no existe`);
    Role.state = StateEnum.DELETED;
    await this._roleRepository.save(Role);
  }

  async updatePermission(id: number, permissiosAddeds: Permission[], permissiosRemoveds: Permission[]): Promise<void> {
    const role = await this._roleRepository.findOne({
      where: { id: id },
      relations: [
        "permissions"
      ]
    });
    if (!role) throw new NotFoundException(`el rol no existe`);
    // set permissions added and removed
    await this._roleRepository
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(role)
      .addAndRemove(permissiosAddeds, permissiosRemoveds);
  }
}
