import { PageDto } from "../../dto/page.dto"
import { PageOptionsDto } from "../ipagemeta/ipagemeta"

export interface IService<T, U>{
    create(obj: T): Promise<U>
    search(pageOptionsDto: PageOptionsDto): Promise<PageDto<U>>
    update(id: number, obj: T): Promise<U>
    remove(id: number): Promise<void>
}