import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationService } from '../../services/application/application.service';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { Application } from '../../entities/application.entity';
import { ApplicationDto } from '../../dto/application.dto';

@Controller('application')
@ApiTags('Application')
export class ApplicationController {
    constructor(private _applicationService: ApplicationService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de aplicaciones', type: PageDto<Application>})
    async getData(@Query() params: PageOptionsDto) {
        return await this._applicationService.search(params)
    }

    @Post('/create')
    @ApiResponse({ status: 201, description: 'Crear aplicacion', type: Application})
    async create(@Body() objectDto: ApplicationDto) {
        return await this._applicationService.create(objectDto)
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Actualizar aplicacion', type: Application})
    async update(@Param('id') id: number, @Body() objectDto: ApplicationDto) {
        return await this._applicationService.update(id, objectDto)
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'Inactivar aplicacion'})
    async delete(@Param('id') id: number) {
        return await this._applicationService.remove(id)
    }
}
