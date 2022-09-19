
class EmailEntity {
    private address: string;

    constructor(address: string) {
        this.address = address;
    }

    setAddress(address: string) {
        this.address = address;
    }

    getAddress(): string {
        return this.address
    }

}

export default EmailEntity;