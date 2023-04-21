import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MenuOptionService } from '../../services/menu-option/menu-option.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { MenuOption } from '../../entities/menuOption.entity';
import { MenuOptionDto } from '../../dto/menuOption.dto';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';

@Controller('menu-option')
@ApiTags('Master')
export class MenuOptionController {
constructor(private _menuOptionService: MenuOptionService) { }

@Get()
@ApiResponse({ status: 200, description: 'Listado de opciones de menus', type: PageDto<MenuOption>})
async getData(@Query() params: PageOptionsDto) {
    return await this._menuOptionService.search(params)
}

@Post('/create')
@ApiResponse({ status: 201, description: 'Crear opcion menu', type: MenuOption})
async create(@Body() objectDto: MenuOptionDto) {
    return await this._menuOptionService.create(objectDto)
}

@Put('/:id')
@ApiResponse({ status: 200, description: 'Actualizar opcion menu', type: MenuOption})
async update(@Param('id') id: number, @Body() objectDto: MenuOptionDto) {
    return await this._menuOptionService.update(id, objectDto)
}

@Delete('/:id')
@ApiResponse({ status: 200, description: 'Inactivar opcion menu'})
async delete(@Param('id') id: number) {
    return await this._menuOptionService.remove(id)
}
}
