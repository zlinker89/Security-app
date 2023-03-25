export interface IService<T, U>{
    create(obj: T): Promise<U>
    findAll(): Promise<U[]>
    update(id: number, obj: T): Promise<U>
    remove(id: number): Promise<void>
}