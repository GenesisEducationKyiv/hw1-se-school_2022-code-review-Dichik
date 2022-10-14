import { ProducerBroker } from "./brokers/producerBroker";

export class Producer {

    private broker: ProducerBroker;
    private queue: string;

    constructor(broker: ProducerBroker, queue: string) {
        this.broker = broker;
        this.queue = queue;
    }

    public async publish(msg: string): Promise<void> {
        const connection = await this.broker.connect();
        const channel = await this.broker.createChannel(connection);

        const wasSent: any = await this.broker.send(channel, this.queue, msg);
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
        console.log(wasSent);
    }

}