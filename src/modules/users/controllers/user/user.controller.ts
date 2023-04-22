import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/modules/shared/dto/page-options.dto';
import { PageDto } from 'src/modules/shared/dto/page.dto';
import { User } from '../../entities/user.entity';
import { UserDto } from '../../dto/user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private _userService: UsersService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Listado de usuarios', type: PageDto<User>})
    async getData(@Query() params: PageOptionsDto) {
        return await this._userService.search(params)
    }

    @Post('/create')
    @ApiResponse({ status: 201, description: 'Crear usuario', type: User})
    async create(@Body() objectDto: UserDto) {
        return await this._userService.create(objectDto)
    }

    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Actualizar usuario', type: User})
    async update(@Param('id') id: number, @Body() objectDto: UserDto) {
        return await this._userService.update(id, objectDto)
    }

    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'Inactivar usuario'})
    async delete(@Param('id') id: number) {
        return await this._userService.remove(id)
    }
}
