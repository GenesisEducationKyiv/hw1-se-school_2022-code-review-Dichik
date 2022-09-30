export interface Repository<T> {
    isExist(object: T): Promise<boolean>

    getAll(): Promise<Array<T>>

    getById(id: number): T

    delete(id: T): T

    bulkDelete(ids: Array<T>): Promise<Array<T>>

    save(object: T): Promise<void>
}
