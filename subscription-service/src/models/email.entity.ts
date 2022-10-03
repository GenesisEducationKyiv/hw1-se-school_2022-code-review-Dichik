export class EmailEntity {
    private _address: string;

    constructor(address: string) {
        this._address = address;
    }

    public get address(): string {
        return this._address;
    }
}
