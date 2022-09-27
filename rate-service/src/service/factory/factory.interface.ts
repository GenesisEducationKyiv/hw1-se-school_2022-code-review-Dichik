interface Factory {
    init(): void

    getByName(name: string): any
}

export default Factory
