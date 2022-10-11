import { RabbitMQ } from "./rabbitmq";

export class Producer {

    private broker: RabbitMQ;

    constructor(broker: RabbitMQ) {
        this.broker = broker;
    }

    public async produce(): Promise<void> {

    }

}