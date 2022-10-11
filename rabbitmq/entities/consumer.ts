import { RabbitMQ } from "./rabbitmq";


export class Consumer {

    private broker: RabbitMQ;
    private queue: string;

    constructor(broker: RabbitMQ, queue: string) {
        this.broker = broker;
        this.queue = queue; 
    }

    public async consumer(): Promise<Array<string>> {
        const connection = await this.broker.connect();
        const channel = await this.broker.createChannel(connection);

        const messages: Array<string> = await this.broker.consume(channel, this.queue);
        connection.close();
        return messages;
    }

}