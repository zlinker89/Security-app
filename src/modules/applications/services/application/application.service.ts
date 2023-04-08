import { Injectable, NotFoundException } from '@nestjs/common';
import { Application } from '../../entities/application.entity';
import { ApplicationDto } from '../../dto/application.dto';
import { IService } from 'src/modules/shared/interfaces/iservice/iservice.interface';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { StateEnum, TypeFilter } from 'src/common/enum';
import { PageMetaDto } from 'src/modules/shared/dto/page-meta.dto';
import { FindOneOptions, Like } from 'typeorm';
import { ApplicationRepository } from '../../repositories/application.repository';
import { TenantService } from 'src/modules/tenant/services/tenant/tenant.service';

@Injectable()
export class ApplicationService
  implements IService<ApplicationDto, Application>
{
  private readonly table = 'application';
  constructor(
    private readonly _applicationRepository: ApplicationRepository,
    private readonly _tenantService: TenantService,
  ) {}

  async create(obj: ApplicationDto): Promise<Application> {
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId }
    })
    return await this._applicationRepository.save({
      name: obj.name,
      tenant: tenant,
      typeApp: obj.typeApp,
    });
  }

  async search(pageOptionsDto: PageOptionsDto): Promise<PageDto<Application>> {
    const queryBuilder = this._applicationRepository.createQueryBuilder(
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

  async findOne(pre: FindOneOptions<Application>): Promise<Application>{
    return await this._applicationRepository.findOne(pre)
  }
  async update(id: number, obj: ApplicationDto): Promise<Application> {
    const application = await this._applicationRepository.findOne({
      where: [
        { state: StateEnum.ACTIVE, id: id },
        { state: StateEnum.INACTIVE, id: id },
      ],
    });
    if (!application) throw new NotFoundException(`La aplicacion no existe`);
    const tenant = await this._tenantService.findOne({
      where: { id: obj.tenantId }
    })
    const updatedApplication = {
      id: application.id,
      name: obj.name,
      tenant: tenant,
      typeApp: obj.typeApp,
    };
    return await this._applicationRepository.save(updatedApplication);
  }

  async remove(id: number): Promise<void> {
    const application = await this._applicationRepository.findOne({
      where: { state: StateEnum.ACTIVE, id: id },
    });
    if (!application) throw new NotFoundException(`La aplicacion no existe`);
    application.state = StateEnum.DELETED;
    await this._applicationRepository.save(application);
  }
}
