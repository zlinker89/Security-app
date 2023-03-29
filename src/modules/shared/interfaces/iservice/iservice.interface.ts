import { PageOptionsDto } from "../../dto/page-options.dto"
import { PageDto } from "../../dto/page.dto"

export interface IService<T, U>{
    create(obj: T): Promise<U>
    search(pageOptionsDto: PageOptionsDto): Promise<PageDto<U>>
    update(id: number, obj: T): Promise<U>
    remove(id: number): Promise<void>
}