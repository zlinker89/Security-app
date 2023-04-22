import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../../services/role/role.service';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { Role } from '../../entities/role.entity';
import { RoleDto } from '../../dto/role.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';

@Controller('role')
@ApiTags('Role')
export class RoleController {
    constructor(private _roleService: RoleService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de roles', type: PageDto<Role>})
    async getData(@Query() params: PageOptionsDto) {
        return await this._roleService.search(params)
    }

    @Post('/create')
    @ApiResponse({ status: 201, description: 'Crear rol', type: Role})
    async create(@Body() objectDto: RoleDto) {
        return await this._roleService.create(objectDto)
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Actualizar rol', type: Role})
    async update(@Param('id') id: number, @Body() objectDto: RoleDto) {
        return await this._roleService.update(id, objectDto)
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'Inactivar rol'})
    async delete(@Param('id') id: number) {
        return await this._roleService.remove(id)
    }
}
