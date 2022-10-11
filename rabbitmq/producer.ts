import { RabbitMQ } from "./rabbitmq";

export class Producer {

    private broker: RabbitMQ;

    constructor(broker: RabbitMQ) {
        this.broker = broker;
    }

    public async produce(msg: string): Promise<void> {
        const connection = await this.broker.connect();
        const channel = await this.broker.createChannel(connection);

        const wasSent: any = await this.broker.send(channel, 'rate', msg);
        connection.close();
        console.log(wasSent);
    }

}