import { RabbitMQ } from "./rabbitmq";


export class Consumer {

    private broker: RabbitMQ;

    constructor(broker: RabbitMQ) {
        this.broker = broker;
    }

    public async consumer(): Promise<Array<string>> {
        const connection = await this.broker.connect();
        const channel = await this.broker.createChannel(connection);

        const messages: Array<string> = await this.broker.consume(channel, 'rate');
        connection.close();
        return messages;
    }

}