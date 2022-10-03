export interface Repository<T> {
    isExist(object: T): Promise<boolean>

    getAll(): Promise<Array<T>>

    save(object: T): Promise<void>
}
