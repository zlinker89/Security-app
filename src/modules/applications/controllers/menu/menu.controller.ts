import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MenuService } from '../../services/menu/menu.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { Menu } from '../../entities/menu.entity';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { MenuDto } from '../../dto/menu.dto';

@Controller('menu')
@ApiTags('Master')
export class MenuController {
    constructor(private _menuService: MenuService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de menus', type: PageDto<Menu>})
    async getData(@Query() params: PageOptionsDto) {
        return await this._menuService.search(params)
    }

    @Post('/create')
    @ApiResponse({ status: 201, description: 'Crear menu', type: Menu})
    async create(@Body() objectDto: MenuDto) {
        return await this._menuService.create(objectDto)
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Actualizar menu', type: Menu})
    async update(@Param('id') id: number, @Body() objectDto: MenuDto) {
        return await this._menuService.update(id, objectDto)
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'Inactivar menu'})
    async delete(@Param('id') id: number) {
        return await this._menuService.remove(id)
    }
}
