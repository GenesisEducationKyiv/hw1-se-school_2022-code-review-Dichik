export interface Factory {
    init(): void

    getByName(name: string): any
}
