import { Controller, Get, Query } from '@nestjs/common';
import { Body, Delete, Param, Post, Put } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { TenantDto } from '../../dto/tenant.dto';
import { Tenant } from '../../entities/tenant.entity';
import { TenantService } from '../../services/tenant/tenant.service';

@Controller('tenant')
@ApiTags('Master')
export class TenantController {
    constructor(private _tenantService: TenantService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de inquilinos/clientes', type: PageDto<Tenant>})
    async getData(@Query() params: PageOptionsDto) {
        return await this._tenantService.search(params)
    }

    @Post('/create')
    @ApiResponse({ status: 201, description: 'Crear inquilinos/clientes', type: Tenant})
    async create(@Body() tenantDto: TenantDto) {
        return await this._tenantService.create(tenantDto)
    }

    @Put('/:tenantId')
    @ApiResponse({ status: 200, description: 'Actualizar inquilinos/clientes', type: Tenant})
    async update(@Param('tenantId') id: number, @Body() tenantDto: TenantDto) {
        return await this._tenantService.update(id, tenantDto)
    }

    @Delete('/:tenantId')
    @ApiResponse({ status: 200, description: 'Inactivar inquilinos/clientes'})
    async delete(@Param('tenantId') id: number) {
        return await this._tenantService.remove(id)
    }
}
