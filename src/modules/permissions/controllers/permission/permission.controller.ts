import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { PermissionService } from '../../services/permission/permission.service';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { Permission } from '../../entities/permision.entity';
import { PermissionDto } from '../../dto/permission.dto';

@Controller('permission')
@ApiTags('Permission')
export class PermissionController
{
    constructor(private _permissionService: PermissionService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de permiso', type: PageDto<Permission>})
    async getData(@Query() params: PageOptionsDto) {
        return await this._permissionService.search(params)
    }

    @Post('/create')
    @ApiResponse({ status: 201, description: 'Crear permiso', type: Permission})
    async create(@Body() objectDto: PermissionDto) {
        return await this._permissionService.create(objectDto)
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Actualizar permiso', type: Permission})
    async update(@Param('id') id: number, @Body() objectDto: PermissionDto) {
        return await this._permissionService.update(id, objectDto)
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'Inactivar permiso'})
    async delete(@Param('id') id: number) {
        return await this._permissionService.remove(id)
    }
}
