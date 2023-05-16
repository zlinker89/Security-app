import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ModuleService } from '../../services/module/module.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { Module } from '../../entities/module.entity';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { ModuleDto } from '../../dto/module.dto';

@Controller('module')
@ApiTags('Module')
export class ModuleController {
    constructor(private _moduleService: ModuleService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de menus', type: PageDto<Module>})
    async getData(@Query() params: PageOptionsDto) {
        return await this._moduleService.search(params)
    }

    @Post('/create')
    @ApiResponse({ status: 201, description: 'Crear menu', type: Module})
    async create(@Body() objectDto: ModuleDto) {
        return await this._moduleService.create(objectDto)
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Actualizar menu', type: Module})
    async update(@Param('id') id: number, @Body() objectDto: ModuleDto) {
        return await this._moduleService.update(id, objectDto)
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'Inactivar menu'})
    async delete(@Param('id') id: number) {
        return await this._moduleService.remove(id)
    }
}
