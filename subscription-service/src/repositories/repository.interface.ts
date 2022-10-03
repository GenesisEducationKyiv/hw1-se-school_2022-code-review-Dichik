export interface Repository<T> {
    isExist(object: T): Promise<boolean>

    getAll(): Promise<Array<T>>

    getById(id: number): T

    save(object: T): Promise<void>
}
