import { RabbitMQ } from "./rabbitmq";

export class Producer {

    private broker: RabbitMQ;
    private queue: string;

    constructor(broker: RabbitMQ, queue: string) {
        this.broker = broker;
        this.queue = queue;
    }

    public async produce(msg: string): Promise<void> {
        const connection = await this.broker.connect();
        const channel = await this.broker.createChannel(connection);

        const wasSent: any = await this.broker.send(channel, this.queue, msg);
        connection.close();
        console.log(wasSent);
    }

}