import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { UserDto } from '../../dto/user.dto';
import { User } from '../../entities/user.entity';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';
import { UserRepository } from '../../repositories/user.repository';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { StateEnum, TypeFilter } from 'src/common/enum';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { FindOneOptions, Like, ObjectType, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/modules/roles/services/role/role.service';

@Injectable()
export class UsersService implements IService<UserDto, User> {
  private readonly table = 'user';
  private readonly saltOrRounds = 10;
  private excludeColumns = (
    columnsToExclude: string[]
  ): string[] =>
    this._userRepository.metadata.columns
        .map(column => column.databaseName)
        .filter(columnName => !columnsToExclude.includes(columnName))
        .map(columnName => `${this.table}.${columnName}`);

  constructor(
    private readonly _tenantService: TenantService,
    private readonly _rolService: RoleService,
    private readonly _userRepository: UserRepository,
  ) {}

  async create(obj: UserDto): Promise<User> {
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId },
    });
    const role = await this._rolService.findOne({
      where: { id: obj.roleId },
    });
    const hash = await bcrypt.hash(obj.password, this.saltOrRounds);
    return await this._userRepository.save({
      userName: obj.userName,
      password: hash,
      tenant: tenant,
      role: role,
    });
  }

  async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this._userRepository.createQueryBuilder(this.table);

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
    const selectedColumns = this.excludeColumns(['password']);
    queryBuilder
      .select(selectedColumns)
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

  async findOne(pre: FindOneOptions<User>): Promise<User> {
    return await this._userRepository.findOne(pre);
  }
  async update(id: number, obj: UserDto): Promise<User> {
    const user = await this._userRepository.findOne({
      where: [
        { state: StateEnum.ACTIVE, id: id },
        { state: StateEnum.INACTIVE, id: id },
      ],
    });
    if (!user) throw new NotFoundException(`El usuario no existe`);
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId },
    });
    const role = await this._rolService.findOne({
      where: { id: obj.roleId },
    });
    const updatedUser: any = {
      id: user.id,
      userName: obj.userName,
      tenant: tenant,
      role: role,
    };
    // update password
    if (obj.password) {
      const hash = await bcrypt.hash(obj.password, this.saltOrRounds);
      updatedUser.password = hash;
    }
    return await this._userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this._userRepository.findOne({
      where: { state: StateEnum.ACTIVE, id: id },
    });
    if (!user) throw new NotFoundException(`El usuario no existe`);
    user.state = StateEnum.DELETED;
    await this._userRepository.save(user);
  }
}
